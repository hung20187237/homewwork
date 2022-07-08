import userEvent from '@testing-library/user-event'
import React from 'react'
import "./DetailCard.css"

export default function DetailCard(user, post) {
  return (
    <div className='dashboardaccount'>
        {user&&
            <div className='dashboardaccounttop'>
                <span className='dashboardaccounttitle'> Account</span>
                <div className='accountcontainer'>
                    <div className='accountcontaineritem'>
                        <span>Total: {user.length}</span>
                    </div>
                    <div className='accountcontaineritem'>
                        <span>Active: {user.active}</span>
                    </div>
                    <div className='accountcontaineritem'>
                        <span>Expired: {user.expired}</span>
                    </div>
                </div>
            </div>
        }
        {post&&
            <div className='dashboardaccounttop'>
                <span className='dashboardaccounttitle'> Account</span>
                <div className='accountcontainer'>
                    <div className='accountcontaineritem'>
                        <span>Total: {post.length}</span>
                    </div>
                    <div className='accountcontaineritem'>
                        <span>Published: {post.published}</span>
                    </div>
                    <div className='accountcontaineritem'>
                        <span>Scheduling: {post.scheduling}</span>
                    </div>
                </div>
            </div>
        }
    </div>
  )
}
