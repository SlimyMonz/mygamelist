import React from 'react'
import {Link} from 'react-router-dom'
import './AboutCompStyles.css'

// this component will add a card to the About page that displays our mission statement
const AboutComp = () => {
    return (
        <div className='about'>
            <div className='card-container'>
                <div className='card'>
                  
                    {/* <span className='bar'></span> */}
                    <p className='subtitle'>- Our Story -</p>
                    <p>We are a group of gamers who share a passion for accessible gaming. If there's one thing 
                        we know, it's that there's an endless supply of games. But how do you keep track of it all?
                        We developed this easy to use site so that people like us can have a central list of all games 
                        they own, across any platform. We wanted our users to also be able to rate their games within their 
                        list. Played a game ten years ago but don't remember if you liked it? With your personal rating system, 
                        you can rate the games in your library so you have a quick reference down the road.  </p>
                    {/* Here instead of the link, just bring up the Register Modal */}
                    <Link to='/games' className='btn'> Search Games </Link>
                </div>

            </div>
        </div>
       
    )
}

export default AboutComp