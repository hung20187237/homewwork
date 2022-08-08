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
    Select,
    Img
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
import { ImgurClient } from 'imgur';





export default function CreatePost() {
    const [mutifile, setMutifile] = useState(null);
    const [desc, setDesc] = useState(null);
    const [access, setAccess] = useState("EAAFFBX64npsBANZC53IUFrYX0WBykmToV3SqAR2BI1mCHTRUjxtN1Na7lazZCkWcgrad4BzVL9qubfNYrZAw3jAaG8qm6ZCBTuJVp9DZCyopY2eyLn0FZAc3QZA5ar95nqZCAEKHEIDZB5ZCJ4KGvbrUqwe93pEqp3oHeTZB0H87l5ZAg5O21oZCRhrnCiBaqrRXtMQEt10d2eB8nEAZDZD")
    const [source, setSource]  = useState(null);
    const [url, setlistUrl] = useState([null])
    const {user} = useContext(Context)
    const username = user.username;
    const [accounts, setAccounts] = useState([]);
    const [files, setFiles] = useState();
    const [mutiupload, setMutiupload] = useState(null);
    const { user: currentUser, notifyFlag, dispatch } = useContext(Context);
    const content = useRef()
    const status = useRef()
    const account = useRef()


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

    const ShowUrlImage = async() => {
        let choseImage = [];
          try {
            if (Array.isArray(mutiupload)) {
              const uploadArray = mutiupload.map(async item => {
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
              console.log(choseImage)
              setlistUrl(choseImage)
    
            }
          } catch (error) {
            alert("image not uploaded");
          }
        
    }

    const postRandomQuote = async (e) => {
        e.preventDefault();
        
        const newData1 = {
            access_token: access,
            message: content.current.value,
            link: mutifile[0],
        }
        if(files.length === 1){
            const newData = {
                access_token: access,
                message: content.current.value,
                url: url[0]
            }
            
            console.log(newData)
            try {
                await axios.post("https://graph.facebook.com/100547109409842/photos?", newData)
                .then(
                res => {
                    const result = res.data;
                    console.log(result);
                    alert("Success!");
                },
                    error => {
                    console.log(error);
                })
            }catch (err) { }
        }
        if(files.length > 1){
            const child_attachments =  url.map(v => ({ link: v, picture: v  }))
            console.log(child_attachments)
            newData1.child_attachments = child_attachments
            try {
                await axios.post("https://graph.facebook.com/100547109409842/feed?", newData1)
                .then(
                res => {
                    const result = res.data;
                    console.log(result);
                    alert("Success!");
                },
                    error => {
                    console.log(error);
                })
            }catch (err) { }
        }
    };



    const handlePostSubmit = async (e) => {
        e.preventDefault();
        const newPost = { userId: currentUser._id,
            accountId: account.current.value, 
            desc: content.current.value, 
            status: status.current.value 
        }
        if (mutiupload) {
            const data = new FormData();
            let fileName = [];
            mutiupload.map(file =>
                data.append('images', file)
            )

            console.log(data);
            try {
                await axios.post("http://localhost:8800/api/mutiupload", data)
                    .then(res =>
                        res.data
                    ).then(data =>
                        data.file.map(file =>
                            fileName.push(file.filename)
                        )
                    )
                    newPost.img = Object.values(fileName)
                
            }
            catch (err) { }
        }
        if (source) {
            const data = new FormData();
            let fileName = [];
            source.map(file =>
                data.append('videos', file)
            )
            try {
                await axios.post("http://localhost:8800/api/mutiupload", data)
                    .then(res =>
                        res.data
                    ).then(data =>
                        data.file.map(file =>
                            fileName.push(file.filename)
                        )
                    )
                newPost.video = Object.values(fileName);
            }
            catch (err) { }
        }
        try {
          console.log(newPost)
          await axios.post("http://localhost:8800/api/post", newPost);
          window.location.reload();
        } catch (err) {
          console.log(err)
        }
    }
    
    const MutipleFileChange = (files) => {
        console.log(files)
        const listImg =Object.values(files)
        const listUrl = listImg.map( img => URL.createObjectURL(img));
        setFiles(files)
        setMutiupload(listImg)
        setMutifile(listUrl);
    }
    const handleFileChange = (files) => {
        const listvideo = Object.values(files);
        setSource(listvideo);
    };
    // const someFunc = (e) => {
    //     e.preventDefault();
    //     handlePostSubmit();
    //     ShowUrlImage();
    //     postRandomQuote();
    // }

    


    return (
        <>
            <Topbar/>
            <div className='homecontainer'>
                <Sidebar/>
                <div className='bodycreatepost'>
                    <div className='createpostleft'>
                        <form className="reviewBottom">
                            <div className='createpostTop'>

                                <Select placeholder= 'UserAccount'
                                    size={'lg'} 
                                    variant='filled'
                                    marginTop={'4vh'}
                                    width='300px'
                                    height={'50px'}
                                    padding={'10px 28px'}
                                    borderRadius='10px'
                                    ref={account}
                
                                    
                                >
                                        
                                    {accounts.map((a) => {
                                        
                                        return (
                                            <option value={a.accountId} 
                                                onChange={(e)=>setAccess(a.accessToken)}
                                            >{a.accountname}</option>
                                            
                                        )
                                    })} 
                                    
                                </Select>
                                
                                <button className='buttonselect'>Select teamviewer</button>
                            </div>
                            <div>
                                <textarea
                                    className="createpostInput"
                                    placeholder="Post content..."
                                    onChange={(e) => setDesc(e.target.value)}
                                    ref={content}
                                ></textarea>
                            </div>

                            <label htmlFor="file" className="addimagepost">
                                <span className="addimageText">Add image</span>
                                <input
                                    style={{ display: "none" }}
                                    type="file"
                                    id="file"
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

                            <Button marginTop={50} 
                                height='40px'
                                width={'70%'}
                                border='1px solid'
                                borderRadius={20}
                                background={'rgb(200, 230, 255)'}
                                onClick={handleFileChange}
                            >Share</Button>

                        </form>
                    </div>
                    <div className='createpostright'>
                        <div className='createpostrightTop'>

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
                                <option value='Published1'>Published</option>
                                <option value='Scheduled'>Scheduled</option>
                                <option value='Approcal'>Approcal</option>
                                <option value='Failed'>Failed</option>
                                <option value='Draft'>Draft</option>
                            </Select>
                            
                        </div>
                        <Box className='postrightBody'>
                            <span>Preview</span>
                            <Box>
                                {desc && (
                                <Text textAlign={'left'} padding={'4px'}>{desc}</Text>)}
                                {mutifile && (
                                <Flex flexWrap={'wrap'} justifyContent= 'space-between'>
                                    <FbImageLibrary images={mutifile} countFrom={5} />
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

