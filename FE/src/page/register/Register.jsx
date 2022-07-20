import React from 'react'
import "./Register.css"
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";

export default function Register() {
    const navigate = useNavigate();
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
  
    const handleClickRegister = async (e) => {
      e.preventDefault();
      if (passwordAgain.current.value !== password.current.value) {
        passwordAgain.current.setCustomValidity("Passwords don't match!");
      } else {
        const user = {
          username: username.current.value,
          email: email.current.value,
          password: password.current.value,
        };
        try {
          await axios.post("http://localhost:8800/api/auth/register", user);
          navigate('/')
        } catch (err) {
          console.log(err);
        }
      }
    };
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
              ref={username}
            />
            <input
              placeholder="Email"
              required
              className="registerInput"
              type="email"
              ref={email}
            />
            <input
              placeholder="Password"
              required
              className="registerInput"
              type="password"
              minLength="6"
              ref={password}
            />
            <input
              placeholder="Password Again"
              required
              className="registerInput"
              type="password"
              ref={passwordAgain}
            />
            <button className="registerButton" type="submit"  onClick={(handleClickRegister)}>
              Sign Up
            </button>
            <button className="registerLoginButton" onClick={handleClickLoginAccount}>Log into Account</button>
          </form>
        </div>
      </div>
    </div>
  )
}
