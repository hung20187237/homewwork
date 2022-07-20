import React from 'react'
import { useEffect, useMemo, useState } from "react"
import "./Post.css"
import DetailCard from '../../Component/DetailCard/DetailCard'
import Sidebar from '../../Component/Sidebar/Sidebar'
import Topbar from '../../Component/Topbar/Topbar'
import { postdata } from '../../PostData'

export default function Post() {
    const [data, setData] = useState(postdata);
    const filterResult=(catItem)=>{
        const result = postdata.filter((curData)=>{
            return curData.status===catItem
        });
        setData(result)
    }

    const Item = ({createdAt, img, content, username})=>(
        
        <div className='postlistitem'>
                <div className='postitemleft'>
                    <span>{createdAt}</span>
                    <div>
                        <img src={img} alt="" className='imgpostitem'/>
                    <   p>{content}</p>
                    </div>
                </div>
                <div className='postitemright'>
                    <span>History</span>
                    <span>{username}</span>
                </div>
        </div>
    );


  return (
    <>
        {/* <Topbar/> */}
        <div className='homecontainer'>
          <Sidebar/>
          <div className='bodydashboard'>
            <div className='listposttop'>
                <span className='topaccountname'>Account name</span>
                <span className='posttime'>2022/01/01 - 2022/02/02</span>
            </div>
            <div className='buttonlist'>
                <button className='postlistbutton' onClick={()=>setData(postdata)}>
                    <span>All</span>
                </button>
                <button className='postlistbutton' onClick={()=>filterResult('Published')}>
                    <span>Published</span>
                </button>
                <button className='postlistbutton' onClick={()=>filterResult('Scheduled')}>
                    <span>Scheduled</span>
                </button>
                <button className='postlistbutton' onClick={()=>filterResult('Approcal')}>
                    <span>Approcal</span>
                </button> 
                <button className='postlistbutton' onClick={()=>filterResult('Failed')}>
                    <span>Failed</span>
                </button> 
                <button className='postlistbutton' onClick={()=>filterResult('Draft')}>
                    <span>Draft</span>
                </button>    
                
            </div>
            
            <div className='postlistbody'>
                {data.map((post, index)=> (
                    <Item {...post} key={index}/>
                ))}
            </div>
            
          </div>
        </div>
    </>
  )
}
