import React from 'react'
import "./Sidebar.css"

export default function Sidebar() {
  return (
    <div className='sidebar'>
      <ul className='sidebarlist'>
        <li className="sidebarListItem">
          <span className="sidebarListItemText">DashBoard</span>
        </li>
        <li className="sidebarListItem">
          <span className="sidebarListItemText">Create Post</span>
        </li>
        <li className="sidebarListItem">
          <span className="sidebarListItemText">List Post</span>
        </li>
        <li className="sidebarListItem">
          <span className="sidebarListItemText">Analysis</span>
        </li>
        <li className="sidebarListItem">
          <span className="sidebarListItemText">Setting</span>
        </li>
      </ul>
    </div>
  )
}
