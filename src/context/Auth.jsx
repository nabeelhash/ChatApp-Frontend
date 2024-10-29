import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react'

export const AuthContext = createContext();

export const AuthProvider = function({children}){

    const [auth,setAuth] = useState({
        user: null,
        token: ""
    })
    console.log(auth)

    useEffect(function(){
        const calling = JSON.parse(localStorage.getItem('auth'))
        setAuth(calling)
    },[])
    return(
        <AuthContext.Provider value={{auth,setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}