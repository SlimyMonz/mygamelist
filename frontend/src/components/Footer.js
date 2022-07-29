import React from 'react'
import './FooterStyles.css'
import {FaTwitter, FaFacebookSquare,FaInstagram,FaRegEnvelope,FaMailBulk} from 'react-icons/fa';

const Footer = () => {
    return (
        <div className='footer'>
            <div className='footer-container'>
                <div className='left'>
                    <div className='email'>
                        <FaRegEnvelope size={20} style={{color: '#ffffff', marginRight: '2rem' }}/>
                        <div>
                            <h4>Need Help? Email Us</h4>
                            <p>mglcustomersupport@gmail.com</p> 
                        </div>
                    </div>

                </div>

                <div className='right'>
                    <h4>Social</h4>
                    <p>Give us a follow and stay updated! @mglsocial</p>
                    <div className='socials'>
                        <FaTwitter size={20} style={{color: '#ffffff', marginRight: '2rem' }}/>
                        <FaFacebookSquare size={20} style={{color: '#ffffff', marginRight: '2rem' }}/>
                        <FaInstagram size={20} style={{color: '#ffffff', marginRight: '2rem' }}/>
                        <FaMailBulk size={20} style={{color: '#ffffff', marginRight: '2rem' }}/>
                    </div>
                </div>
            </div>

        </div>
    
    )
    
}

export default Footer