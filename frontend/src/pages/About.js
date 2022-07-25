import React from 'react'
import MainLogin from '../components/MainLogin'
import Footer from '../components/Footer'
import BackImage from '../components/BackImage'
const About = () => {
    return (
        <div>
            <MainLogin/>
            <BackImage heading='Our Mission' text='For gamers. By gamers.'/>
            <Footer/>
        </div>
    )
}

export default About