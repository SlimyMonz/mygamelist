import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import LoggedInName from '../components/LoggedInName';
import ModalComponent from './Modals/ModalComponent';
import LoginModal from './Modals/LoginModal';
import RegisterModal from './Modals/RegisterModal';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import gamelogo from '../controllerlogo.png';
import {FaBars, FaTimes} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import '../components/MainLogin.css';
import {useLocation, useNavigate} from 'react-router-dom';
import Toast from 'react-bootstrap/Toast';


function MainLogin()
{
   

    let userInfo = localStorage.getItem('user');
    //alert("userInfo is " + userInfo );
    //let userInfoMoar = JSON.parse(userInfo);
    let dynamicMain;
    let location = useLocation();
    let toast;
    let rendered = false;
   
    
    
    
    const[click, setClick] = useState(false)
    const[showToast, setToast] = useState(false)
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

    useEffect(() => 
    {
       
        if(location.state === null)
        {
            console.log('HFBEFEFE');
        }
        else
        {

            //alert(location.state.email);
            setToast(true);
        }

    }, [rendered]);

    
        


    if(userInfo)
    {
        
        dynamicMain = 
        <div> 
          {/*putting a p here causes a console.log warning*/}
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
                    
                    <li>{<LoggedInName />}</li> 
                    
                </ul>
                
                    
                <div className='hamburger' onClick={handleClick}>
                    {click ? (<FaTimes size={20} style={{color: '#fff'}} />) : (<FaBars size={20} style={{color: '#fff'}} />)}
                    
                </div>
            </div>

        
        </div>
        
        
    }
    else
    {
        
        dynamicMain = 
        
            
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
                    <li >
                        <ModalComponent
                                                buttonType ={"Login"}
                                                title={"Login"}
                                                body={""}
                                                componentType={LoginModal}
                                            />
                        
                    </li>
                    <li >
                        <ModalComponent
                                                buttonType ={"Register"}
                                                title={"Register"}
                                                body={""}
                                                componentType={RegisterModal}
                                            />
                    </li>
                </ul>
                
                    
                <div className='hamburger' onClick={handleClick}>
                    {click ? (<FaTimes size={20} style={{color: '#fff'}} />) : (<FaBars size={20} style={{color: '#fff'}} />)}
                    
                </div>
                <Toast onClose={() => setToast(false)} show={showToast} delay={4000} autohide>
                    <Toast.Header>
                    <strong className="me-auto">Bootstrap</strong>
                    <small>11 mins ago</small>
                    </Toast.Header>
                    <Toast.Body>Log in to go to your personal list!</Toast.Body>
                </Toast>
            </div>

                    
                

                
                
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
            
        
        
    }


    return(

        <div>
          
            {dynamicMain}
        </div>
    );
}

export default MainLogin;
