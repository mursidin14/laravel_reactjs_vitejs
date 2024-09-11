import { createContext, useContext, useState } from 'react';

const stateContext = createContext({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {},
});

export default function ContextProvider({children}) {
    const [user, setUser] = useState();
    const [token, _setToken] =useState(localStorage.getItem('access_token'));

    const setToken = (token) => {
        _setToken(token);

        if(token) {
            localStorage.getItem("access_token", token);
        } else {
            localStorage.removeItem("access_token");
        }
    }

  return (
    <stateContext.Provider value={{ 
        user,
        setUser,
        token,
        setToken
     }}>
        {children}
    </stateContext.Provider>
  )
}

export const UseStateContext = () => {
    return useContext(stateContext);
}