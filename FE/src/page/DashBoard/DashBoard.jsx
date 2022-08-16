import { DatePicker} from 'antd';
import 'antd/dist/antd.css';
import React from 'react'
import DetailCard from '../../Component/DetailCard/DetailCard'
import Sidebar from '../../Component/Sidebar/Sidebar'
import Topbar from '../../Component/Topbar/Topbar'
import { useContext,useRef,useState,useEffect } from "react";
import { Context} from '../../context/Context';
import "./DashBoard.css"
import axios from "axios";
import moment from "moment";



export default function DashBoard() {
  const {user} = useContext(Context)
  const username = user.username;
  const [posts, setPosts] = useState([]);
  const [dateRange, setDateRange] = useState()

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("http://localhost:8800/api/post/allposts/" + username)
        
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username]);

  const onChange = (date, dateString) => {
    console.log(date, dateString);
    setDateRange(dateString)
  }
  console.log(dateRange)
  const filterDateResult=()=>{
    const result = posts.filter((curDate)=>{
      return (moment(curDate.createdAt).format('L')) == dateRange
    });
    console.log(result)
    setPosts(result)
  }
  return (
    <>
        <Topbar/>
        <div className='homecontainer'>
          <Sidebar/>
          <div className='bodydashboard'>
            <div className='dashboardtime'>
              <DatePicker onChange={onChange} picker="month" />
              <button onClick={filterDateResult}>Clear</button>
            </div>
            <DetailCard/>
            <div className='bodyactivity'>
              <span className='dashboardaccounttitle'> Activity</span>
              <div className='activitycontainer'>
                {posts.map((post) =>(
                  <div className='activitycontaineritem'>
                    <span>{post.accountname} {post.status} the post.</span>
                  </div>
                ))} 
              </div>
              
            </div>
          </div>
        </div>
    </>
  )
}
