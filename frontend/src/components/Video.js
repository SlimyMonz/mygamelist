import React from 'react'
import './VideoStyles.css'
import {Link} from 'react-router-dom'

import controllerVideo from '../controllerVid.mp4'
import retroVideo from '../retroVid.mp4'


const Video = () => {

    return(
        <div className='vid'>
            <video autoPlay loop muted id='video'>
                <source src={retroVideo} type='video/mp4'/>

            </video>

            <div className='content'>
                <div className='text-wrapper'>
                    <h1>My Game List</h1>
                    <p>Your #1 destination for all things gaming.</p>
               

                    <div>
                        <Link to='/games' className='btn btn-light'>Get Started</Link>
                        {/* Next link will link to another part of the home page that shows our mission statement */}
                        <Link to='/' className='btn btn-light'>About Us</Link>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Video