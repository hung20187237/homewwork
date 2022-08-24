import React from 'react'
import Sidebar from '../../Component/Sidebar/Sidebar'
import Topbar from '../../Component/Topbar/Topbar'
import "./Analysis.css"
import { DatePicker, Form } from "antd";
import { useState, useRef, useContext, useEffect } from "react";
import { Context} from '../../context/Context';
import axios from "axios";
import {Select} from "@chakra-ui/react";
import FollowChart from '../../Component/FolloeChart/Followchart';
import Item from '../../Component/ItemCard/Item';
import moment from "moment";

export default function Analysis() {
    const {user} = useContext(Context)
    const username = user.username;
    const [accounts, setAccounts] = useState([]);
    const [accountFollow, setAccountFollow] = useState([]);
    const [datafollow, setDataFollow] = useState([]);
    const [fans, setFans] = useState();
    const [postsId, setPostsId] = useState([]);
    const [data, setData] = useState([]);
    const [engagement, setEngagement] = useState();
    const [reaction, setReaction] = useState();
    const [impressionsUser, setImpressionsUser] = useState();
    const [dateRange, setDateRange] = useState([moment(), moment()]);
    const [impressions, setImpressions] = useState();
    const account = useRef()
    const refs = useRef()
    

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
    
    const getFan = async (e) => {
        
        function myFunc(total, num) {
            return total + num;
        }
        try {
            await axios.get("https://graph.facebook.com/100547109409842", {
                params: {
                    access_token: account.current.value,
                    fields: 'fan_count, followers_count'
                }
            })
            .then(
                res => {
                    const result = res.data;
                    console.log(result);
                    setFans(result.fan_count)
                }
            )
            await axios.get("https://graph.facebook.com/100547109409842/insights?", {
                params: {
                    access_token: account.current.value,
                    metric: 'page_impressions_unique, page_post_engagements, page_impressions, page_engaged_users',
                    date_preset: 'last_90d',
                    period: 'day'
                }
            })
            .then(
                res => {
                    const result = res.data;
                    const list1 = (result.data[1].values).map( item => item.value)
                    const list0 = (result.data[0].values).map( item => item.value)
                    const list2 = (result.data[2].values).map( item => item.value)
                    const list3 = (result.data[3].values).map( item => item.value)
                    setReaction(list1.reduce(myFunc))
                    setImpressions(list2.reduce(myFunc))
                    setEngagement(list3.reduce(myFunc))
                    setImpressionsUser(list0.reduce(myFunc))
                }
            )
            const res = await axios.get("http://localhost:8800/api/follow/allfolow/" + refs.current.value)
            setAccountFollow(
                res.data.sort((p1, p2) => {
                    return new Date(p1.createdAt) - new Date(p2.createdAt);
                })
            );
            setDataFollow(
                res.data.sort((p1, p2) => {
                    return new Date(p1.createdAt) - new Date(p2.createdAt);
                })
            )
            const listrank = [];

            const respos = await axios.get("https://graph.facebook.com/100547109409842/posts?", {
                params: {
                    access_token: account.current.value,
                    fields: 'id, message, full_picture, created_time',
                }
            })
            respos.data.data.map(file =>
                listrank.push(file)
            )

            const result = await Promise.all(listrank.map( async(id) => {
                const res1 = await axios.get(`https://graph.facebook.com/${id.id}/insights?`, {
                    params: {
                        access_token: account.current.value,
                        metric: 'post_engaged_users',
                    }
                })
                id.rank = (res1.data.data[0].values[0].value)

                return id
            }))

            setPostsId(
                result.sort((p1, p2) => {
                    return p2.rank - p1.rank
                })
            );
            setData(result.sort((p1, p2) => {
                return p2.rank - p1.rank
            }))

        } catch (err) {}


    }
    console.log(reaction, impressions, impressionsUser, engagement)
    console.log(accountFollow)
    console.log(postsId)
    const filterDateResult=()=>{
        const listdate = dateRange.map( date => moment(date._d).format())
        console.log(listdate)
        const result = postsId.filter((curDate)=>{
            return (curDate.created_time) >= listdate[0] && (curDate.created_time) <= listdate[1]
        });
        console.log(result)
        setData(result)
        const resultfollow = accountFollow.filter((curDate)=>{
            return  listdate[0] <= (curDate.createdAt) && (curDate.createdAt) <= listdate[1]
        });
        setDataFollow(resultfollow)
    }
    console.log(data)

  return (
    <>
        <Topbar/>
        <div className='homecontainer'>
            <Sidebar/>
            <div className='mainanalysis'>
                <div className='analysistop'>
                    <Select placeholder= 'UserAccount'
                        size={'lg'} 
                        variant='filled'
                        marginTop={'4vh'}
                        width='300px'
                        height={'50px'}
                        padding={'10px 28px'}
                        borderRadius='10px'
                        ref = {account}
                        onChange={getFan}
                    >                        
                        {accounts.map((a) => {       
                            return (
                                <option value={a.accessToken} 
                                ref={e => {refs.current = {value: a.accountId}}}
                                >
                                {a.accountname}</option>
                                                        
                            )
                        })} 
                    </Select>
                    <Form.Item colon={false}>
                        <DatePicker.RangePicker
                            format="MMM Do, YY"
                            value={dateRange}
                            separator={"-"}
                            allowClear={false}
                            onChange={x => {
                                console.log(x);
                                setDateRange(x);
                            }}
                        />
                        <button onClick={filterDateResult}>filter</button>
                    </Form.Item>
                </div>
                <div className='bodyanalysis'>
                    <div className='bodyanalysistop'>
                        <span className='bodyanalysistopcat'>Fans: {fans}</span>
                        <span className='bodyanalysistopcat'>Reacttion rate: {reaction ? (reaction/impressions).toFixed(2)*100:null}%</span>
                        <span className='bodyanalysistopcat'>Engegament rate: {engagement ? (engagement/impressionsUser).toFixed(2)*100:null}%</span>
                    </div>
                    <div className='bodyanalysisbottom'>
                        <div className='followerchart'>
                            <FollowChart accountFollow = {datafollow}/>
                        </div>
                        <div className='postranking'>
                            <span>Post ranking</span>
                            <Item posts = {data}/>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>

  )
}
