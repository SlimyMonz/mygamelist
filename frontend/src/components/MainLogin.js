import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import LoggedInName from '../components/LoggedInName';
import ModalComponent from './Modals/ModalComponent';
import LoginModal from './Modals/LoginModal';
import RegisterModal from './Modals/RegisterModal';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import gamelogo from '../newgamelogo.png';
import {FaBars, FaTimes} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import '../components/MainLogin.css';


function MainLogin()
{
   

    let userInfo = localStorage.getItem('user');
    //alert("userInfo is " + userInfo );
    //let userInfoMoar = JSON.parse(userInfo);
    let dynamicMain;
    
    const[click, setClick] = useState(false)
    const handleClick = () => setClick(!click)

    const[color, setColor] = useState(false)
        const changeColor =() => {
            if(window.scrollY>= 100){
                setColor(true)
            } else{
                setColor(false)
            }
        }

        window.addEventListener('scroll', changeColor)

    
    

    if(userInfo)
    {
        
        dynamicMain = 
        <div> 
        <span id="inner-title"></span><br />
        <p>you ARE already logged in!</p>
        <LoggedInName />
        </div>
        
    }
    else
    {
        
        dynamicMain = 
        
            <div className='header'>
                {/* header/logo */}
                <div className='logo'>
                    <Link to='/'><img src={gamelogo} className='logo' alt="game logo"/></Link>
                </div>
                
                {/* menu items */}
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    {/* Link to home */}
                    <li className='btn btn-links'>
                        <Link to='/'>Home</Link>
                    </li>
                    {/* Link to Games Menu which will take you to a page with the different consoles*/}
                    <li className='btn btn-links'>
                        <Link to='/games'>Games</Link>
                    </li>

                    {/* link to My Games */}
                    <li className='btn btn-links'>
                        <Link to='/mylist'>My List</Link>
                    </li>

                    {/* Link to About Us/Mission Statement */}
                    <li className='btn btn-links'>
                        <Link to='/about'>About Us</Link>
                    </li>

                    {/* hamburger icon */}
                    <div className='hamburger' onClick={handleClick}>
                        {click ? (<FaTimes size={20} style={{color:'#fff'}}/>) : (<FaBars size={20} style={{color:'#fff'}}/>) }
                    
                    </div>

                    <Navbar  expand="lg">
                    
                        {/* <Container className='imgWrapper'>
                            <a href="/" target="_blank" rel="noreferrer">
                            <img src={gamelogo} className='logo' alt="game logo"/>
                            </a>
                        </Container> */}
                        <Container className='loginWrapper'>
                            <Navbar.Brand></Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="loginButtons">
                                
                                        <ModalComponent
                                            buttonType ={"Login"}
                                            title={"Login"}
                                            body={""}
                                            componentType={LoginModal}
                                        />
                                
                                    <Navbar.Text style={{marginLeft: '.5rem'}}>{''}</Navbar.Text>
                                        <ModalComponent
                                            buttonType ={"Register"}
                                            title={"Register"}
                                            body={""}
                                            componentType={RegisterModal}
                                        />
                                
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                
                </ul>

                
                
                {/* <Navbar  expand="lg">
                    
                        {/* <Container className='imgWrapper'>
                            <a href="/" target="_blank" rel="noreferrer">
                            <img src={gamelogo} className='logo' alt="game logo"/>
                            </a>
                        </Container> */}
                        {/* <Container className='loginWrapper'>
                            <Navbar.Brand></Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="loginButtons">
                                
                                        <ModalComponent
                                            buttonType ={"Login"}
                                            title={"Login"}
                                            body={""}
                                            componentType={LoginModal}
                                        />
                                
                                    <Navbar.Text style={{marginLeft: '.5rem'}}>{''}</Navbar.Text>
                                        <ModalComponent
                                            buttonType ={"Register"}
                                            title={"Register"}
                                            body={""}
                                            componentType={RegisterModal}
                                        />
                                
                                </Nav>
                            </Navbar.Collapse>
                    </Container>
                </Navbar> */} 
            </div>
        
        
    }


    return(

        <div>
            {dynamicMain}
        </div>
    );
}

export default MainLogin;
