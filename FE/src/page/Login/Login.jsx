import React from 'react'
import LoginLayout from '../../Component/LoginLayout/LoginLayout'
import { Context, ContextProvider } from '../../context/Context'

export default function Login() {
  
  return (

    <Context.Provider>
      <LoginLayout/>
    </Context.Provider>
  )
}

