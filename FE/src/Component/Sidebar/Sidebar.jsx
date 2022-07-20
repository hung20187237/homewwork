import React from 'react'
import "./Sidebar.css"
import { Link } from 'react-router-dom';

export default function Sidebar() {
  const userFeatureList = [
    {
      title: "DashBoard",
      link: "/dashboard",
    },
    {
      title: "Create Post",
      link: "/createpost",
    },
    {
      title: "List Post",
      link: "/post",
    },
    {
      title: "Analysis",
      link: "/analysis",
    },
    {
      title: "Setting",
      link: "/",
    },
  ];
  return (
    <div className='sidebar'>
      <ul className='sidebarlist'>
        {(userFeatureList).map((item) => (
          <Link style={{ textDecoration: 'none'}}
            className="link"
            to={item.link}
          >
            <li className="sidebarListItem">
              <span className="sidebarListItemText">{item.title}</span>
            </li>
          </Link>
        ))} 
      </ul>
     
    </div>
  )
}
