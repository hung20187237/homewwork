import React from 'react'
import Sidebar from '../../Component/Sidebar/Sidebar'
import Topbar from '../../Component/Topbar/Topbar'
import "./Analysis.css"
import { DatePicker, Form } from "antd";
import { useState, useRef, useContext, useEffect } from "react";
import { Context} from '../../context/Context';
import axios from "axios";
import {Select} from "@chakra-ui/react";

export default function Analysis() {
    const {user} = useContext(Context)
    const username = user.username;
    const [accounts, setAccounts] = useState([]);
    const [fans, setFans] = useState();
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
                    fields: 'fan_count'
                }
            })
            .then(
                res => {
                    const result = res.data;
                    console.log(result);
                    setFans(result.fan_count)
                })
        } catch (err) {}
    }

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
                        <span className='bodyanalysistopcat'>Reacttion rate</span>
                        <span className='bodyanalysistopcat'>Engegament rate</span>
                    </div>
                    <div className='bodyanalysisbottom'>
                        <div className='followerchart'>
                            <span>Follower chart</span>
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
