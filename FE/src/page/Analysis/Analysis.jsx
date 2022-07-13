import React from 'react'
import Sidebar from '../../Component/Sidebar/Sidebar'
import Topbar from '../../Component/Topbar/Topbar'
import "./Analysis.css"

export default function Analysis() {
  return (
    <>
        <Topbar/>
        <div className='homecontainer'>
            <Sidebar/>
            <div className='mainanalysis'>
                <div className='analysistop'>
                    <span className='analysisacount'>Acount</span>
                    <span className='analysisdate'>2022/01/01 - 2022/01/03</span>
                </div>
                <div className='bodyanalysis'>
                    <div className='bodyanalysistop'>
                        <span className='bodyanalysistopcat'>Fans: 40</span>
                        <span className='bodyanalysistopcat'>Reacttion rate</span>
                        <span className='bodyanalysistopcat'>Engegament rate</span>
                    </div>
                    <div className='bodyanalysisbottom'>
                        <div className='followerchart'>
                            <span>Follower chart</span>
                        </div>
                        <div className='postranking'>
                            <span>Post ranking</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>

  )
}
