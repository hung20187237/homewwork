import React from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import "./Topbar.css"
import { useContext } from "react";
import { Context } from "../../context/Context";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const { user,dispatch } = useContext(Context)
  let navigate = useNavigate()

  const handleClickLogout = (e)=>{
    dispatch({ type: "LOG_OUT" });
    navigate('/')
  }

  return (
    <div className='topbarcontainer'>
      <div className='topbarlogo'>Logo</div>
      <div className='topbaruser'>
        <LogoutIcon sx={{ fontSize: 32 }} onClick={handleClickLogout}/>
        <span className= "topbarname">{user.username}</span>
      </div>
    
    </div>
  )
}
