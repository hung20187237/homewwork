import userEvent from '@testing-library/user-event'
import React from 'react'
import DetailCard from '../../Component/DetailCard/DetailCard'
import Sidebar from '../../Component/Sidebar/Sidebar'
import Topbar from '../../Component/Topbar/Topbar'
import "./DashBoard.css"



export default function DashBoard() {
  
  const postdata = [
    {
      username: "Jonny",
      status: "published"
    },
    {
      username: "Jonny",
      status: "scheduling"
    },
    {
      username: "Hanny",
      status: "published"
    },
    {
      username: "Hanny",
      status: "scheduling"
    },
  ] 
  return (
    <>
        <Topbar/>
        <div className='homecontainer'>
          <Sidebar/>
          <div className='bodydashboard'>
            <div className='dashboardtime'>2022/06</div>
            <DetailCard/>
            <div className='bodyactivity'>
              <span className='dashboardaccounttitle'> Activity</span>
              <div className='activitycontainer'>
                {postdata.map((post) =>(
                  <div className='activitycontaineritem'>
                    <span>{post.username} {post.status} the post</span>
                  </div>
                ))} 
              </div>
              
            </div>
          </div>
        </div>
    </>
  )
}
