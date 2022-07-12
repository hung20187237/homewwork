import { Box } from '@mui/material'
import React from 'react'
import Sidebar from '../../Component/Sidebar/Sidebar'
import Topbar from '../../Component/Topbar/Topbar'
import "./CreatePost.css"

export default function CreatePost() {
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
                        />
                    </label>
                </div>
                <div className='createpostright'>
                    <div className='createpostrightTop'>
                        <span className='statustop'>Publish</span>
                    </div>
                    <div className='postrightBody'>
                        <span>Preview</span>
                    </div>
                </div>
            </div>
            
        </div>
    </>
  )
}
