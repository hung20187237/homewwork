import React from 'react'
import { useNavigate } from "react-router-dom";
import "./Login.css"

export default function Login() {
    const navigate = useNavigate();
    const handleClickCreateNewAccount = (e) =>{
        navigate('/register')
    }
  return (
     
    <div className="login">
      <div className="loginWrapper">
        <div className="loginMain">
            <span className='logintitle'>
                Log in
            </span>
          <form className="loginBox" >
            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
            />
            <button className="loginButton" type="submit">Signin</button>
            <button className="loginRegisterButton" onClick={(handleClickCreateNewAccount )}>Create new account</button>
          </form>
        </div>
      </div>
    </div>
  )
}
