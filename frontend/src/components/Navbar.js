import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {FaBars, FaTimes} from 'react-icons/fa'
import './NavbarStyles.css'
import gamelogo from '../controllerlogo.png';

const Navbar = () => {
    const[click, setClick] = useState(false)
    const handleClick = () => setClick(!click)

    const [color, setColor] = useState(false)
        const changeColor =() => {
            if(window.scrollY >= 100) {
                setColor(true)
            } else {
                setColor(false)
            }
        }

        window.addEventListener('scroll', changeColor)

    return (
        <div className={color ? 'header header-bg' : 'header'}>
            <Link to='/'>
                <div className='logo'>
                    <img src={gamelogo} className='logo' alt="game logo"/>
                </div>
            </Link> 
           <ul className={click ? 'nav-menu active' : 'nav-menu'}>
               <li className='btn btn-links'>
                   <Link to='/'>Home</Link>
               </li>
               <li className='btn btn-links'>
                   <Link to='/games'>Games</Link>
               </li>
               <li className='btn btn-links'>
                   <Link to='/mylist'>My List</Link>
               </li>
               <li className='btn btn-links'>
                   <Link to='/about'>About Us</Link>
               </li>

              
           </ul>
           <div className='hamburger' onClick={handleClick}>
            {click ? (<FaTimes size={20} style={{color: '#fff'}} />) : (<FaBars size={20} style={{color: '#fff'}} />)}
               
           </div>
        </div>
    )
}

export default Navbar