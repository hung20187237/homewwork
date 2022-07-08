import React from 'react'
import "./Register.css"
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();
    const handleClickLoginAccount = (e) =>{
        navigate('/')
    }
  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerMain">
            <span className='registertitle'>
                Register
            </span>
          <form className="registerBox">
            <input
              placeholder="Username"
              required
              className="registerInput"
            />
            <input
              placeholder="Email"
              required
              className="registerInput"
              type="email"
            />
            <input
              placeholder="Password"
              required
              className="registerInput"
              type="password"
              minLength="6"
            />
            <input
              placeholder="Password Again"
              required
              className="registerInput"
              type="password"
            />
            <button className="registerButton" type="submit">
              Sign Up
            </button>
            <button className="registerLoginButton" onClick={handleClickLoginAccount}>Log into Account</button>
          </form>
        </div>
      </div>
    </div>
  )
}
