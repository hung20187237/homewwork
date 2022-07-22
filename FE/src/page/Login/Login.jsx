import React from 'react'
import LoginLayout from '../../Component/LoginLayout/Loginlayout';
import { Context, ContextProvider} from "../../context/Context";

export default function Login() {
  return (
    <ContextProvider>
      <LoginLayout/>
    </ContextProvider>
  )
}
