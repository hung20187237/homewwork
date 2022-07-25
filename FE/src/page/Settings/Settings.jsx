import React from 'react'
import "./Settings.css"
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
  } from "@chakra-ui/react";
import Sidebar from '../../Component/Sidebar/Sidebar'
import Topbar from '../../Component/Topbar/Topbar'
import FacebookLogin from "react-facebook-login";
import AccountCard from '../../Component/AccountCard/AccountCard';
import { useContext,useRef,useState,useEffect } from "react";
import { Context, ContextProvider } from '../../context/Context';
import axios from "axios";



export default function Settings() {
    const {user} = useContext(Context)
    const username = user.username;
    const [accounts, setAccounts] = useState([]);


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

    console.log(accounts)
    const [account, setAccount]  = useState({  
        isLoggedIn: false,
        userID: "",
        name: "",
        accessToken: "",
        picture: ""
    });
  
    const responseFacebook = async(response) => {
        console.log(response);
        if (response.status !== "unknown") {
            setAccount({
            isLoggedIn: true,
            userID: response.userID,
            name: response.name,
            accessToken: response.accessToken,
            picture: response.picture.data.url
            });
            const newAccount = {
            userId: user._id,
            accountname: response.name,
            avatar: response.picture.data.url,
            accountId: response.userID,
            accessToken: response.accessToken
            }
            console.log(newAccount)
            try {
                await axios.post("http://localhost:8800/api/account", newAccount);
                window.location.reload();
            }   catch (err) {}
        }

    };
    


  return (
    <>
        <Topbar/>
        <div className='homecontainer'>
            <Sidebar/>
            <div className='mainsettings'>
                <Tabs isFitted colorScheme="red">
                    <TabList style={{ borderBottom: "1px solid #E0DCDC", height: "6vh", justifyContent:"center"}}>
                        <Tab width={'30%'} border='1px solid' borderRadius={10}>SNS</Tab>
                        <Tab width={'30%'} border='1px solid' borderRadius={10}>Notification</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            {accounts.map((a) => {
                                return (
                                <AccountCard  key={a._id} account={a}/>
                                )
                            })} 
                               
                            <Box justifyContent={'center'} display='flex' marginTop={"8vh"}>
                                <FacebookLogin
                                    appId="357364879892123"
                                    autoLoad={true}
                                    fields="id,name,email,picture"
                                    callback={responseFacebook}
                                    icon="fa-facebook"
                                ></FacebookLogin>
                            </Box>
                            
                        </TabPanel>
                        <TabPanel>
                            <Box width={'100%'} height='56vh' border='1px solid'
                                marginTop={'8vh'}
                            >
                                <Box display={'flex'} justifyContent='space-between'
                                    padding={'4px 16px'}
                                >
                                    <Text>When post scheduled</Text>
                                    <Input height={20} width={20}
                                        type={'checkbox'}
                                    />
                                </Box>
                                <Box display={'flex'} justifyContent='space-between'
                                    padding={'4px 16px'}
                                >
                                    <Text>When post published</Text>
                                    <Input height={20} width={20}
                                        type={'checkbox'}
                                    />
                                </Box>
                                <Box display={'flex'} justifyContent='space-between'
                                    padding={'4px 16px'}
                                >
                                    <Text>When post publish failed</Text>
                                    <Input height={20} width={20}
                                        type={'checkbox'}
                                    />
                                </Box>
                                <Box display={'flex'} justifyContent='space-between'
                                    padding={'4px 16px'}
                                >
                                    <Text>When post is approved</Text>
                                    <Input height={20} width={20}
                                        type={'checkbox'}
                                    />
                                </Box>
                                <Box display={'flex'} justifyContent='space-between'
                                    padding={'4px 16px'}
                                >
                                    <Text>When token expired</Text>
                                    <Input height={20} width={20}
                                        type={'checkbox'}
                                    />
                                </Box>
                            </Box>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </div>
        </div>

    </>
  )
}
