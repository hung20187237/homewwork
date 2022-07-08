import React from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import "./Topbar.css"

export default function Topbar() {
  return (
    <div className='topbarcontainer'>
      <div className='topbarlogo'>Logo</div>
      <div className='topbaruser'>
        <LogoutIcon sx={{ fontSize: 32 }}/>
        <span className= "topbarname">Username</span>
      </div>
    
    </div>
  )
}
