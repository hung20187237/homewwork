
import React from 'react'
import { useState, useRef, useContext, useEffect } from "react";
import {
    Box,
    Flex,
    Button,
    Text,
    Select,
  } from "@chakra-ui/react";
import FbImageLibrary from 'react-fb-image-grid'
import axios from "axios";

import Sidebar from '../../Component/Sidebar/Sidebar'
import Topbar from '../../Component/Topbar/Topbar'
import CancelIcon from '@mui/icons-material/Cancel';
import { Context} from '../../context/Context';
import "./CreatePost.css"





export default function CreatePost() {
    const [mutifile, setMutifile] = useState(null);
    const [source, setSource]  = useState(null);
    const [desc, setDesc] = useState(null)
    const {user} = useContext(Context)
    const username = user.username;
    const [accounts, setAccounts] = useState([]);
    const [files, setFiles] = useState(null);
    const [mutiupload, setMutiupload] = useState(null);
    const { user: currentUser } = useContext(Context);
    const GRAPH_API = process.env.REACT_APP_GRAPH_API
    const HOST = process.env.REACT_APP_LOCALHOST
    const content = useRef()
    const status = useRef()
    const account = useRef()
    const refs = useRef()
    var currentTimeInSeconds=Math.floor(Date.now()/1000)

    const onChange = () => {
        const listref = account.current.values
        console.log(listref)
    }

    useEffect(() => {
      const fetchAccounts = async () => {
        const res = await axios.get(`${HOST}/api/account/accountfb/` + username)
          
        setAccounts(
            res.data.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt);
            })
        );
      };
      fetchAccounts();
    }, [username]);


  
    const postUrlvideo = async(e) => {
        const src = new FormData()
        console.log(source)
        const fileName = source.name;
        src.append("name", fileName);
        src.append("file", source);
        src.append("access_token", refs.current.value)
        src.append("description", content.current.value)
        if(status.current.value === 'Scheduled'){
            src.published = 'false'
            src.scheduled_publish_time = currentTimeInSeconds + 600
        }

        if(status.current.value === 'Approcal' || status.current.value === 'Failed' || status.current.value === 'Draft'){
            src.published = 'false'
        }
        console.log(src)
        try {
            axios.post(`${GRAPH_API}/100547109409842/videos?`, src)
            .then(
                res => {
                    const result = res.data;
                    console.log(result);
                    alert("upload video Success!");
                    window.location.reload();
                })
        } catch (err) {
            alert("video not uploaded")
        }
    }   

    const showUrlImage = async(e) => {
        let choseImage = [];
        if (Array.isArray(mutiupload)) {
            const uploadArray = mutiupload.map(async item => {
                console.log(item)
                const resultUpload = await axios({
                    method: "post",
                    url: "https://api.imgur.com/3/image",
                    headers: {
                        Authorization: `Client-ID 225600e2fe06d7b`
                    },
                    data :item
                }) 
                console.log(resultUpload)// bỏ hết then đi
                if (resultUpload.status === 200) {
                    return resultUpload.data.data.link;
                }
            });
            choseImage = await Promise.all(uploadArray);
        }

        const postRandomQuote = async (e) => {
            
            const newData = {
                access_token: refs.current.value,
                message: content.current.value,
            }
            if(status.current.value === 'Scheduled'){
                newData.published = 'false'
                newData.scheduled_publish_time = currentTimeInSeconds + 600
            }

            if(status.current.value === 'Approcal' || status.current.value === 'Failed' || status.current.value === 'Draft'){
                newData.published = 'false'
            }
            if(files.length === 1){
                
                newData.url = choseImage[0]
                console.log(newData)
                try {
                    axios.post(`${GRAPH_API}/100547109409842/photos?`, newData)
                    .then(
                    res => {
                        const result = res.data;
                        console.log(result);
                        alert("upload image Success!");
                        window.location.reload();
                    },
                        error => {
                        console.log(error);
                    })
                    // window.location.reload();
                }catch (err) { }
            }
            if(files.length > 1){
                const child_attachments =  choseImage.map(v => ({ link: v, picture: v  }))
                console.log(child_attachments)
                newData.child_attachments = child_attachments
                newData.link = `${GRAPH_API}/Test-1-100547109409842`
                try {
                    axios.post(`${GRAPH_API}/100547109409842/feed?`, newData)
                    .then(
                    res => {
                        const result = res.data;
                        console.log(result);
                        alert("upload images Success!");
                        window.location.reload();
                    },
                        error => {
                        console.log(error);
                    })
                    // 
                }catch (err) { }
            }
            if(files.length === 0){
                try {
                    axios.post(`${GRAPH_API}/100547109409842/feed?`, newData)
                    .then(
                    res => {
                        const result = res.data;
                        console.log(result);
                        alert("upload post Success!");
                        window.location.reload();
                    },
                        error => {
                        console.log(error);
                    })
                }catch (err) { }
            }
        };
        postRandomQuote()
        
        
    }


    const handlePostSubmit = async (e) => {
        const newPost = { userId: currentUser._id,
            accountId: account.current.value, 
            desc: content.current.value, 
            status: status.current.value 
        }
        console.log(mutiupload)
        if (mutiupload) {
            const data = new FormData();
            let fileName = [];
            mutiupload.map(file =>
                data.append('images', file)
            )

            console.log(data);
            try {
                await axios.post(`${HOST}/api/mutiupload`, data)
                    .then(res =>
                        res.data
                    ).then(data =>
                        data.file.map(file =>
                            fileName.push(file.filename)
                        )
                    )
                console.log(fileName)
                newPost.img =  fileName
            }
            catch (err) { }
        
        }
        if (source) {
            const data = new FormData();
            const fileName = Date.now() + source.name;
            data.append("name", fileName);
            data.append("file", source);
            console.log(data)
            newPost.video = fileName;
            console.log(newPost);
            try {
                await axios.post(`${HOST}/api/upload`, data);
            } catch (err) {}
        }
        try {
          console.log(newPost)
          await axios.post(`${HOST}/api/post`, newPost);
        } catch (err) {
          console.log(err)
        }
    }
    
    const mutipleFileChange = (files) => {
        console.log(files)
        const listImg = Object.values(files)
        const listUrl = listImg.map( img => URL.createObjectURL(img))
        setFiles(files)
        setMutifile(listUrl)
        setMutiupload(listImg)
    }
    const someFunc = (e) => {
        handlePostSubmit();
        showUrlImage();
        postUrlvideo();
        
    }

    


    return (
        <>
            <Topbar/>
            <div className='home-container'>
                <Sidebar/>
                <div className='body-create-post'>
                    <div className='create-post-left'>
                        <form className="review-Bottom" encType="multipart/form-data">
                            <div className='create-post-Top'>

                                <Select placeholder= 'UserAccount'
                                    className='select-account-create'
                                    ref={account}
                                    onChange={onChange}
                                    
                                >
                                        
                                    {accounts.map((a) => {
                                        
                                        return (
                                            <option value={a.accountId} 
                                            ref={e => {refs.current = {value: a.accessToken}}}
                                            >{a.accountname}</option>
                                            
                                        )
                                    })} 
                                    
                                </Select>
                                
                                <button className='button-select'>Select teamviewer</button>
                            </div>
                            <div>
                                <textarea
                                    className="create-post-Input"
                                    placeholder="Post content..."
                                    onChange={(e) => setDesc(e.target.value)}
                                    ref={content}
                                ></textarea>
                            </div>

                            <label htmlFor="file" className="add-image-post">
                                <span className="add-image-Text">Add image</span>
                                <input
                                    style={{ display: "none" }}
                                    type="file"
                                    id="file"
                                    multiple
                                    accept=".png,.jpeg,.jpg"
                                    onChange={(e) => {           
                                        mutipleFileChange(e.target.files);                                       
                                    }}
                                
                                />
                            </label>
                            
                            <label htmlFor="video" className="add-video-post">
                                <span className="add-image-Text">Add video</span>
                                <input
                                    style={{ display: "none" }}
                                    type="file"
                                    id="video"
                                    accept=".mp4,.avi,.vmv"
                                    onChange={(e) => {
                                        setSource(e.target.files[0])
                                    }}
                                />
                            </label>
                            <Button marginTop={50} 
                                height='40px'
                                width={'70%'}
                                border='1px solid'
                                borderRadius={20}
                                background={'rgb(200, 230, 255)'}
                                onClick={someFunc}
                            >Share</Button>

                        </form>
                    </div>
                    <div className='create-post-right'>
                        <div className='create-post-right-Top'>

                            <Select placeholder='Status' 
                                size={'lg'} 
                                variant='outline'
                                float={'right'}
                                marginTop='4vh'
                                width={'200px'}
                                height='40px'
                                borderRadius='10px'
                                ref={status}
                            >
                                <option value='Published'>Published</option>
                                <option value='Scheduled'>Scheduled</option>
                                <option value='Approcal'>Approcal</option>
                                <option value='Failed'>Failed</option>
                                <option value='Draft'>Draft</option>
                            </Select>
                            
                        </div>
                        <Box className='post-right-Body'>
                            <span>Preview</span>
                            <Box>
                                {desc && (
                                <Text textAlign={'left'} padding={'4px'}>{desc}</Text>)}
                                {mutifile &&(
                                <Flex flexWrap={'wrap'} justifyContent= 'space-between'>
                                    <FbImageLibrary images={mutifile} countFrom={5} />
                                    <CancelIcon className="review-Cancel-Img" onClick={() => setMutifile(null)} />
                                </Flex>
                                
                                )}
                                {source && (
                                    <Flex flexWrap={'wrap'} justifyContent= 'space-between'>

                                            <video
                                                className="Video-Input_video"
                                                width="86%"
                                                controls
                                                src={URL.createObjectURL(source)}
                                            />
                                        <CancelIcon className="review-Cancel-Img" onClick={() => setSource(null)} />
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

