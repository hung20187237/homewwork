import React from 'react'
import {
    Box,
    Flex,
    Image,
    SimpleGrid,
    Spacer,
    Button,
    Input,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    Select,
    Img
} from "@chakra-ui/react";
import "bootstrap-daterangepicker/daterangepicker.css";
import "./Post.css"
import Sidebar from '../../Component/Sidebar/Sidebar'
import Topbar from '../../Component/Topbar/Topbar'
import { Context} from '../../context/Context';
import { useState, useRef, useContext, useEffect } from "react";
import axios from "axios";
import DateRangePicker from '../../Component/Datepicker/DatePicker';

export default function Post() {
    // const [data, setData] = useState(posts);
    const {user} = useContext(Context)
    const username = user.username;
    const [accounts, setAccounts] = useState([]);
    const [posts, setPosts] = useState([]);
    const account = useRef()


    // const filterResult=(catItem)=>{
    //     const result = posts.filter((curData)=>{
    //         return curData.status===catItem
    //     });
    //     setData(result)
    // }
    useEffect(() => {
        const fetchAccounts = async () => {
          const res = await axios.get("http://localhost:8800/api/account/accountfb/" + username)
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
            await axios.get("http://localhost:8800/api/post/profile/" + accountId)
            .then(
                res => {
                    const result = res.data;
                    console.log(result);
                    alert("upload video Success!");
                    setPosts(
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
        <Topbar/>
        <div className='homecontainer'>
          <Sidebar/>
          <div className='bodydashboard'>
            <div className='listposttop'>
                <Select placeholder= 'UserAccount'
                    size={'lg'} 
                    variant='filled'
                    marginTop={'4vh'}
                    width='300px'
                    height={'50px'}
                    padding={'10px 28px'}
                    borderRadius='10px'
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
                <div className='posttime'> 
                    <DateRangePicker 
                    />
                </div>
            </div>
            <div className='buttonlist'>
                <button className='postlistbutton' onClick={()=>setData(posts)}>
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
                {posts.map((post, index)=> (
                    <Item {...post} key={index}/>
                ))}
            </div>
            
          </div>
        </div>
    </>
  )
}
