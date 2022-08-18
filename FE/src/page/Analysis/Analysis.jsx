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

export default function Analysis() {
    const {user} = useContext(Context)
    const username = user.username;
    const [accounts, setAccounts] = useState([]);
    const [fans, setFans] = useState();
    const [engagement, setEngagement] = useState();
    const [reaction, setReaction] = useState();
    const [impressionsUser, setImpressionsUser] = useState();
    const [impressions, setImpressions] = useState();
    const accessToken = useRef('')


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
        const newData = {
            access_token: accessToken.current.value
        }
        console.log(newData)
        try {
            await axios.get("https://graph.facebook.com/100547109409842", {
                params: {
                    access_token: accessToken.current.value,
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
                    access_token: accessToken.current.value,
                    metric: 'page_impressions_unique, page_post_engagements, page_impressions, page_engaged_users',
                    date_preset: 'last_90d',
                    period: 'day'
                }
            })
            .then(
                res => {
                    const result = res.data;
                    console.log(result);
                    const list1 = (result.data[1].values).map( item => item.value)
                    const list0 = (result.data[0].values).map( item => item.value)
                    const list2 = (result.data[2].values).map( item => item.value)
                    const list3 = (result.data[3].values).map( item => item.value)
                    function myFunc(total, num) {
                        return total + num;
                    }
                    setReaction(list1.reduce(myFunc))
                    setImpressions(list2.reduce(myFunc))
                    setEngagement(list3.reduce(myFunc))
                    setImpressionsUser(list0.reduce(myFunc))
                }
            )
        } catch (err) {}
    }
    console.log(reaction, impressions, impressionsUser, engagement)
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
                        ref = {accessToken}
                        onChange={getFan}
                    >                        
                        {accounts.map((a) => {       
                            return (
                                <option value={(a.accessToken)}
                                >
                                {a.accountname}</option>
                                                        
                            )
                        })} 
                    </Select>
                    <Form.Item colon={false}>
                        <DatePicker.RangePicker
                            format="MMM Do, YY"
                            separator={"-"}
                            allowClear={false}
                        />
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
                            <FollowChart/>
                        </div>
                        <div className='postranking'>
                            <span>Post ranking</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>

  )
}
