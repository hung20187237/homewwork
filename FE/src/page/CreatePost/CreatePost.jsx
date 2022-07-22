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
    Select
  } from "@chakra-ui/react";
import React from 'react'
import FbImageLibrary from 'react-fb-image-grid'
import Sidebar from '../../Component/Sidebar/Sidebar'
import Topbar from '../../Component/Topbar/Topbar'
import { useState, useRef, useContext, useEffect } from "react";
import CancelIcon from '@mui/icons-material/Cancel';
import { Context} from '../../context/Context';
import axios from "axios";
import "./CreatePost.css"

export default function CreatePost() {
    const [mutifile, setMutifile] = useState(null);
    const [desc, setDesc] = useState(null);
    const [source, setSource]  = useState(null);
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


    const MutipleFileChange = (files) => {
        const listImg =Object.values(files)
        const listUrl = listImg.map( img => URL.createObjectURL(img));
        setMutifile(listUrl);
    }
    const handleFileChange = (files) => {
        
        const listvideo = Object.values(files);
        setSource(listvideo);
      };


  return (
    <>
        <Topbar/>
        <div className='homecontainer'>
            <Sidebar/>
            <div className='bodycreatepost'>
                <div className='createpostleft'>
                    <div className='createpostTop'>

                        <Box padding={'10px 28px'} marginTop='4vh' border={'1px solid'}>
                            <Select placeholder='Published' 
                               size={'lg'} 
                               variant='outline'
                            >
                                
                                {accounts.map((a) => {
                                    return (
                                        <option value={a.accountname}>{a.accountname}</option>
                                    )
                                })} 
                            </Select>
                        </Box>
                        <button className='buttonselect'>Select teamviewer</button>
                    </div>
                    <div>
                        <textarea
                            className="createpostInput"
                            placeholder="Post content..."
                            onChange={(e) => setDesc(e.target.value)}
                        ></textarea>
                    </div>

                    <label htmlFor="img" className="addimagepost">
                        <span className="addimageText">Add image</span>
                        <input
                            style={{ display: "none" }}
                            type="file"
                            id="img"
                            multiple
                            accept=".png,.jpeg,.jpg"
                            onChange={(e) => {           
                                MutipleFileChange(e.target.files)
                            }}
                           
                        />
                    </label>
                    
                    <label htmlFor="video" className="addvideopost">
                        <span className="addimageText">Add video</span>
                        <input
                            style={{ display: "none" }}
                            type="file"
                            id="video"
                            multiple
                            accept=".mp4,.avi,.vmv"
                            onChange={(e) => {
                                handleFileChange(e.target.files)
                            }}
                        />
                    </label>
                </div>
                <div className='createpostright'>
                    <div className='createpostrightTop'>
                        <Box
                            float={'right'}
                            marginTop='4vh'
                            width={'200px'}
                        >
                            <Select placeholder='Published' 
                               size={'lg'} 
                               variant='outline'
                            >
                                <option value='Scheduled'>Scheduled</option>
                                <option value='Approcal'>Approcal</option>
                                <option value='Failed'>Failed</option>
                                <option value='Draft'>Draft</option>
                            </Select>
                        </Box>
                        
                    </div>
                    <Box className='postrightBody'>
                        <span>Preview</span>
                        <Box>
                            {desc && (
                            <Text textAlign={'left'} padding={'4px'}>{desc}</Text>)}
                            {mutifile && (
                            <Flex flexWrap={'wrap'} justifyContent= 'space-between'>
                                <FbImageLibrary images={mutifile} countFrom={3} />
                                <CancelIcon className="reviewCancelImg" onClick={() => setMutifile(null)} />
                            </Flex>
                            
                            )}
                            {source && (
                                <Flex flexWrap={'wrap'} justifyContent= 'space-between'>
                                    {source.map((vid)=> {
                                        if(source.length === 1){
                                            return (
                                                <video
                                                    className="VideoInput_video"
                                                    width="86%"
                                                    controls
                                                    src={URL.createObjectURL(vid)}
                                                />
                                            )
                                        }
                                        if(source.length > 1){
                                            return (
                                                <video
                                                    className="VideoInput_video1"
                                                    controls
                                                    src={URL.createObjectURL(vid)}
                                                />
                                            )
                                        }
                                    
                                    })}
                                    <CancelIcon className="reviewCancelImg" onClick={() => setSource(null)} />
                                </Flex>
                            )}
                        </Box>
                    </Box>
                </div>
            </div>
            
        </div>
    </>
  )
}
