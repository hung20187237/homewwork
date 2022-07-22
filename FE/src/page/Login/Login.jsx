import React from 'react'
import "./Login.css"
import { useNavigate} from "react-router-dom";
import { useRef, useContext } from "react";
import axios from "axios";
import { Context} from "../../context/Context";

export default function Login() {
  let navigate = useNavigate();
  const email = useRef();
  const password = useRef();
  const {dispatch} = useContext(Context);

  const handleClickLogin = async (dispatch) => {
      try{
        console.log(1223)
        const res = await axios.post("http://localhost:8800/api/auth/login",{ email: email.current.value, password: password.current.value });
        console.log(123)
        dispatch({type: 'LOG_IN',payload: res.data});
        navigate('/')
       
      } 
      catch(err){
        console.log(err)
      }
    // e.preventDefault();
  };
  const handleClickCreateNewAccount = (e) =>{
      navigate('/register')
  }
  return (
    <Context.Provider value={{dispatch}}>
      <>
        <div className="login">
          <div className="loginWrapper">
            <div className="loginMain">
                <span className='logintitle'>
                    Log in
                </span>
              <form className="loginBox">
                <input
                  placeholder="Email"
                  type="email"
                  required
                  className="loginInput"
                  ref={email}
                />
                <input
                  placeholder="Password"
                  type="password"
                  required
                  minLength="6"
                  className="loginInput"
                  ref={password}
                />
                <button className="loginButton" type="submit" onClick={(handleClickLogin)}>Sign in
                </button>
              </form>
              <button className="loginRegisterButton" onClick={(handleClickCreateNewAccount )}>Create new account</button>
            </div>
          </div>
        </div>
      </>
      </Context.Provider>
  )
}
