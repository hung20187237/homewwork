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
import React from 'react'
import Sidebar from '../../Component/Sidebar/Sidebar'
import Topbar from '../../Component/Topbar/Topbar'
import { useState, useRef } from "react";
import CancelIcon from '@mui/icons-material/Cancel';
import {Player}
import "./CreatePost.css"

export default function CreatePost() {
    const [mutifile, setMutifile] = useState(null);
    const [desc, setDesc] = useState(null);

    const MutipleFileChange = (files) => {
        const listImg = Object.values(files);
        console.log(listImg);
        setMutifile(listImg);
    }



  return (
    <>
        <Topbar/>
        <div className='homecontainer'>
            <Sidebar/>
            <div className='bodycreatepost'>
                <div className='createpostleft'>
                    <div className='createpostTop'>
                        <span className='accountnametop'>Account name</span>
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
                                console.log(e.target.files);             
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
                                console.log(e.target.files);             
                                MutipleFileChange(e.target.files)
                            }}
                        />
                    </label>
                </div>
                <div className='createpostright'>
                    <div className='createpostrightTop'>
                        <span className='statustop'>Publish</span>
                    </div>
                    <Box className='postrightBody'>
                        <span>Preview</span>
                        <Box>
                            {desc && (
                            <Text textAlign={'left'} padding={'4px'}>{desc}</Text>)}
                            {mutifile && (
                            <Flex flexWrap={'wrap'} justifyContent= 'space-between'>
                                {mutifile.map((img)=> {
                                    if(mutifile.length === 1){
                                        return (
                                            <img className="reviewImg1" src={URL.createObjectURL(img)} alt="" />
                                        )
                                    }
                                    if(mutifile.length > 1){
                                        return (
                                            <img className="reviewImg" src={URL.createObjectURL(img)} alt="" />
                                        )
                                    }
                                   
                                })}
                                <CancelIcon className="reviewCancelImg" onClick={() => setMutifile(null)} />
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
