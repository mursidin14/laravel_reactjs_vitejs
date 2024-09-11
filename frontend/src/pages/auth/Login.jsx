import { useState, useRef } from "react";
import { axiosClient } from "../../api/axios";
import { UseStateContext } from "../../contexts/ContextProvider";

export default function Login() {

  const { setUser, setToken } = UseStateContext();
  const refEmail = useRef();
  const refPassword = useRef();
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
      e.preventDefault();
    const payload = {
      email: refEmail.current.value,
      password: refPassword.current.value,
    };
 
      axiosClient.post("/users/login", payload)
      .then(({data}) => {
        setUser(data.data)
        setToken(data.data.token)
      }).catch((error) => {
          const res = error.response;
          const msg = res.data.errors.message;
          if(res.status == 401) {
              setError(msg)
          }
          console.log(error);
      })
    
  }


  return (
    <div className='grid lg:grid-cols-2 grid-cols-1 gap-4'>
      <div className='container mx-auto my-20'>
        <div className='w-80 mx-auto space-y-7'>
          <h1 className='text-2xl text-black font-semibold'>Login</h1>
          <p className='w-72 text-balck mt-5'>If you dont have an account register You can 
            <a href='/register' className='text-blue-800'> Register here !</a>
          </p>
          {error && <p className="text-base text-red-300">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-login relative">
              <label className='text-slate-500'>Email</label>
              <input 
                ref={refEmail}
                className='outline-none w-80 py-2 px-3 border rounded-md'
                type='email' 
                placeholder='Enter your email address' 
                required
                />
            </div>

            <div className="form-login relative">
                <label className='text-slate-500'>Password</label>
                <input 
                  ref={refPassword}
                  className='outline-none w-80 py-2 px-3 border rounded-md'
                  type='password' 
                  placeholder='Enter your password' 
                  required
                />
            </div>
             <div className='flex mt-2'>
                <input type='checkbox' className='mr-2' />
                <p className='text-black mr-16'>Remember me</p>
                <a href='#' className='text-slate-500'>Forgot Password ?</a>
             </div>

                <button 
                  className='bg-blue-800 text-white w-full h-10 mt-16 rounded-full shadow-lg shadow-blue-500/40'
                  type="submit"
                  >
                    Login
                </button>
              </form>    
        </div>
      </div>
           <div className='bg-blue-950 rounded lg:block hidden avatar'>
            <h2 className='text-white text-3xl font-sans font-bold ml-20 mt-10'>Login to name</h2>
            <p className='text-white text-lg font-sans ml-20'>Lorem Ipsum is simply </p>
        </div>
      </div>
  )
}
