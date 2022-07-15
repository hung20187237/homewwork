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
import { height } from '@mui/system';
import AccountCard from '../../Component/AccountCard/AccountCard';
import { useContext,useRef,useState,useEffect } from "react";
import { Context } from '../../context/Context';


export default function Settings() {
    (function() {
        var e = document.createElement('script'); e.async = true;
        e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';
        document.getElementById('fb-root').appendChild(e);
    }());
    window.fbAsyncInit = function() {
        window.FB.init({
        appId      : '357364879892123',
        cookie     : true,
        xfbml      : true,
        version    : 'v14.0',
        });   
        // window.FB.getLoginStatus(function(response) {   // Called after the JS SDK has been initialized.
        //     statusChangeCallback(response);        // Returns the login status.
        // });
    };
    function login(){
        window.FB.getLoginStatus(function(r){ //check if user already authorized the app
             if(r.status === 'connected'){
                   testAPI();
             }else{
                window.FB.login(function(response) { // opens the login dialog
                        if(response.authResponse) { // check if user authorized the app
                      //if (response.perms) {
                        testAPI();
                    } else {
                      // user is not logged in
                    }
             },{scope:'email'}); //permission required by the app
         }
        });
    }

    
    // function statusChangeCallback(response) {  // Called with the results from FB.getLoginStatus().
    //     console.log('statusChangeCallback');
    //     console.log(response);                   // The current login status of the person.
    //     if (response.status === 'connected') {   // Logged into your webpage and Facebook.
    //       testAPI();  
    //     } else {                                 // Not logged into your webpage or we are unable to tell.
    //       document.getElementById('status').innerHTML = 'Please log ' +
    //         'into this webpage.';
    //     };
        
    
    // }
    // function checkLoginState() {               // Called when a person is finished with the Login Button.
    //     window.FB.getLoginStatus(function(response) {   // See the onlogin handler
    //       statusChangeCallback(response);
    //     });
    // }
    
    
    function testAPI() {                      // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
        console.log('Welcome!  Fetching your information.... ');
        window.FB.api('/me', function(response) {
          console.log('Successful login for: ' + response.name);
          document.getElementById('status').innerHTML =
            'Thanks for logging in, ' + response.name + '!';
        });
    };

  return (
    <>

        {/* <Context>
            <Topbar/>
        </Context> */}
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
                            <AccountCard/>
                            <AccountCard/>
                               
                            <Box justifyContent={'center'} display='flex' marginTop={"8vh"}>
                                <Button padding={'10px 24px'} borderRadius='10px'
                                    fontSize={18}
                                    onClick={login()}
                                >Add</Button>
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
