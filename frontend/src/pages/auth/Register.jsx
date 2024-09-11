import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosClient } from "../../api/axios";
import { UseStateContext } from "../../contexts/ContextProvider";


export default function Register() {

  const { setUser } = UseStateContext();
  const refName = useRef();
  const refEmail = useRef();
  const refPassword = useRef();
  // const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: refName.current.value,
      email: refEmail.current.value,
      password: refPassword.current.value,
    }

      axiosClient.post("/users", payload)
      .then((data) => {
        const res = data.data;
        setUser(res);
        navigate('/login')
        
      }).catch((error) => {
        const res = error.response;
        const msg = res.data.errors.email;
        if(res.status == 400) {
            setError(msg)
        }
    })
  }

  return (
    <div className='grid lg:grid-cols-2 grid-cols-1 gap-4'>
        <div className='container mx-auto my-20'>
          <div className='w-80 mx-auto space-y-6'>
            <h1 className='text-2xl text-black font-semibold'>Register</h1>
            <p className='w-72 text-balck mt-5'>If you dont have an account register You can 
              <Link to='/login' className='text-blue-800'> Login here !</Link>
            </p>
            {error && <p className="text-base text-red-300">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="relative">
                <label className='text-slate-500'>Name</label>
                <input
                  ref={refName} 
                  className='outline-none w-80 py-2 px-3 border rounded-md'
                  type='text' 
                  placeholder='Enter your name' 
                  required
                />
              </div>

              <div className="relative">
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
                  placeholder='Enter your Password' 
                  required
                />
              </div>

                <button 
                  type="submit"
                  className='bg-blue-800 text-white w-full h-10 mt-16 rounded-full shadow-lg shadow-blue-500/40'
                  >
                    Register
                </button>
              </form>
          </div>
        </div>
        <div className='bg-blue-950 rounded lg:block hidden avatar'>
            <h2 className='text-white text-3xl font-sans font-bold ml-20 mt-10'>Register to name</h2>
            <p className='text-white text-lg font-sans ml-20'>Lorem Ipsum is simply </p>
        </div>
      </div>
  )
}
