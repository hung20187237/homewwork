import React from 'react'
import {
    Select,
} from "@chakra-ui/react";
import "bootstrap-daterangepicker/daterangepicker.css";
import "./Post.css"
import "antd/dist/antd.css"
import { DatePicker, Form } from "antd";
import moment from "moment";
import { useState, useRef, useContext, useEffect } from "react";
import axios from "axios";

import Sidebar from '../../Component/Sidebar/Sidebar'
import Topbar from '../../Component/Topbar/Topbar'
import { Context} from '../../context/Context';



export default function Post() {
    const {user} = useContext(Context)
    const username = user.username;
    const [accounts, setAccounts] = useState([]);
    const [posts, setPosts] = useState([]);
    const account = useRef()
    const [dateRange, setDateRange] = useState([moment(), moment()]);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const HOST = process.env.REACT_APP_LOCALHOST
    const [data, setData] = useState([]);


    const filterResult=(catItem)=>{
        const result = posts.filter((curData)=>{
            return curData.status===catItem
        });
        setData(result)
    }
    useEffect(() => {
        const fetchAccounts = async () => {
          const res = await axios.get(`${HOST}/api/account/accountfb/` + username)
          setAccounts(
              res.data.sort((p1, p2) => {
                  return new Date(p2.createdAt) - new Date(p1.createdAt);
              })
            );
        };
        fetchAccounts();
    }, [username]);  
    
    const getPostAccount = async(e) => {
        const accountId = account.current.value
        console.log(accountId)
        try {
            axios.get(`${HOST}/api/post/profile/` + accountId)
            .then(
                res => {
                    const result = res.data;
                    console.log(result);
                    alert("upload Posts Success!");
                    setPosts(
                        res.data.sort((p1, p2) => {
                            return new Date(p2.createdAt) - new Date(p1.createdAt);
                        })
                    );
                    setData(
                        res.data.sort((p1, p2) => {
                            return new Date(p2.createdAt) - new Date(p1.createdAt);
                        })
                    );
                }
            )
                
        } catch (err) {
            alert("Post err")
        }
    }   
    console.log(posts)
    console.log(data)
    console.log(dateRange)
    const filterDateResult=()=>{
        const listdate = dateRange.map( date => moment(date._d).format())
        console.log(listdate)
        const result = posts.filter((curDate)=>{
            return (curDate.createdAt) >= listdate[0] && (curDate.createdAt) <= listdate[1]
        });
        console.log(result)
        setData(result)
    }

    const Item = ({createdAt, img, video, desc, accountname})=>(
        
        <div className='postlistitem'>
                <div className='postitemleft'>
                    <span>{moment(createdAt).format('L')}</span>
                    <div>
                        {img ? <img src={PF + img[0]} alt="" className='imgpostitem'/>: null}
                        {video ? <video width= '16vh'
                            height= '8vh' 
                            alt=""
                            src={PF + video}
                        />:null}
                        <p>{desc}</p>
                    </div>
                </div>
                <div className='postitemright'>
                    <span>History</span>
                    {accountname ? <span>{accountname}</span>: <span>Hung Tran</span>}
                </div>
        </div>
    );


  return (
    <>
        <Topbar/>
        <div className='home-container'>
          <Sidebar/>
          <div className='body-dashboard'>
            <div className='list-post-top'>
                <Select placeholder= 'UserAccount'
                    className='selectaccount'
                    ref={account}
                    onChange={getPostAccount}
                
                >                        
                    {accounts.map((a) => {
                                       
                        return (
                            <option value={a.accountId}
                            >
                                {a.accountname}
                            </option>
                                                
                        )
                    })} 
                </Select>
                <div className='post-time'> 
                    <Form.Item colon={false}>
                        <DatePicker.RangePicker
                            format="MMM Do, YY"
                            value={dateRange}
                            separator={"-"}
                            onChange={x => {
                            console.log(x);
                            setDateRange(x);
                            }}
                            allowClear={false}
                        />
                        <button onClick={filterDateResult}>filter</button>
                    </Form.Item>
                </div>
            </div>
            <div className='buttonlist'>
                <button className='post-list-button' onClick={()=>setData(posts)}>
                    <span>All</span>
                </button>
                <button className='post-list-button' onClick={()=>filterResult('Published')}>
                    <span>Published</span>
                </button>
                <button className='post-list-button' onClick={()=>filterResult('Scheduled')}>
                    <span>Scheduled</span>
                </button>
                <button className='post-list-button' onClick={()=>filterResult('Approcal')}>
                    <span>Approcal</span>
                </button> 
                <button className='post-list-button' onClick={()=>filterResult('Failed')}>
                    <span>Failed</span>
                </button> 
                <button className='post-list-button' onClick={()=>filterResult('Draft')}>
                    <span>Draft</span>
                </button>    
                
            </div>
            
            <div className='post-list-body'>
                {data.map((post, index)=> (
                    <Item {...post} key={index}/>
                ))}
            </div>
            
          </div>
        </div>
    </>
  )
}
