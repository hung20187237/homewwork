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


export default function Settings() {
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
                            <AccountCard/>
                            <AccountCard/>
                               
                            <Box justifyContent={'center'} display='flex' marginTop={"8vh"}>
                                <Button padding={'10px 24px'} borderRadius='10px'
                                    fontSize={18}
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
