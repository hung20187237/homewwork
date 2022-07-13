import React from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import "./Topbar.css"
import { useEffect, useState } from 'react';
import axios from "axios";
import { useParams } from "react-router";

export default function Topbar() {
  const [user, setUser] = useState();
  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`http://localhost:8800/api/user?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);
  return (
    <div className='topbarcontainer'>
      <div className='topbarlogo'>Logo</div>
      <div className='topbaruser'>
        <LogoutIcon sx={{ fontSize: 32 }}/>
        <span className= "topbarname">{user.username}</span>
      </div>
    
    </div>
  )
}
