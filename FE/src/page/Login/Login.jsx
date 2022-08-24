import React from 'react'
import { useNavigate} from "react-router-dom";
import { useRef, useContext } from "react";
import axios from "axios";

import { Context} from "../../context/Context";
import "./Login.css"

export default function LoginLayout() {
  let navigate = useNavigate();
  const email = useRef();
  const password = useRef();
  const {dispatch} = useContext(Context);

  const handleClickLogin = async (e) => {
    e.preventDefault();
      try{
        console.log(1223)
        const res = await axios.post("http://localhost:8800/api/auth/login",{ email: email.current.value, password: password.current.value });
        dispatch({type: 'LOG_IN',payload: res.data});
        navigate('/')
       
      } 
      catch(err){
        console.log(err)
      }

  };
  const handleClickCreateNewAccount = (e) =>{
      navigate('/register')
  }
  return (
      <>
        <div className="login">
          <div className="login-Wrapper">
            <div className="login-Main">
                <span className='login-title'>
                    Log in
                </span>
              <form className="login-Box">
                <input
                  placeholder="Email"
                  type="email"
                  required
                  className="login-Input"
                  ref={email}
                />
                <input
                  placeholder="Password"
                  type="password"
                  required
                  minLength="6"
                  className="login-Input"
                  ref={password}
                />
                <button className="login-Button" onClick={(handleClickLogin)}>Sign in
                </button>
              </form>
              <button className="login-Register-Button" onClick={(handleClickCreateNewAccount )}>Create new account</button>
            </div>
          </div>
        </div>
      </>
  )
}
