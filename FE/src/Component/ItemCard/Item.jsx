import React from 'react'
import "./Item.css"

export default function Item(posts) {
  return (
    <>
    {posts.posts.map((post, index=5) => {
        return(
            <div className='postlistitem1' key={index<=5} >
                <div className='postitemleft1'>
                    <div>
                        {post.full_picture ? <img src={post.full_picture} alt="" className='imgpostitem'/>: null}
                        <p>{post.message}</p>
                    </div>
                </div>
                <div className='postitemright1'>
                    <span>Engagement: {post.rank}</span>
                </div>
            </div>
        )

    })}
    </>
)
}
