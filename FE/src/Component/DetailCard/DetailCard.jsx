
import React from 'react'
import "./DetailCard.css"
import { useContext,useRef,useState,useEffect } from "react";
import { Context} from '../../context/Context';
import axios from "axios";


export default function DetailCard() {
    const {user} = useContext(Context)
    const username = user.username;
    const [posts, setPosts] = useState([])
    const [accounts, setAccounts] = useState([]);
    const published = posts.filter((curData)=>curData.status==='Published')
    const scheduling = posts.filter((curData)=>curData.status==='Scheduling')

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
    }, [username])

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

    return (
        <div className='dashboardaccount'>
            {accounts&&
                <div className='dashboardaccounttop'>
                    <span className='dashboardaccounttitle'> Account</span>
                    <div className='accountcontainer'>
                        <div className='accountcontaineritem'>
                            <span>Total: {accounts.length}</span>
                        </div>
                        <div className='accountcontaineritem'>
                            <span>Active: {(accounts.filter((curData)=>curData.status===true)).length}</span>
                        </div>
                        <div className='accountcontaineritem'>
                            <span>Expired: {(accounts.filter((curData)=>curData.status===false)).length}</span>
                        </div>
                    </div>
                </div>
            }
            {posts&&
                <div className='dashboardaccounttop'>
                    <span className='dashboardaccounttitle'> Posts</span>
                    <div className='accountcontainer'>
                        <div className='accountcontaineritem'>
                            <span>Total: {posts.length}</span>
                        </div>
                        <div className='accountcontaineritem'>
                            <span>Published: {published.length}</span>
                        </div>
                        <div className='accountcontaineritem'>
                            <span>Scheduling: {scheduling.length}</span>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
