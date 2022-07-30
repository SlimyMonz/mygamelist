import React, { useState, useEffect } from 'react';
import {Navigate, useLocation, useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ModalComponent from './Modals/ModalComponent';
import LoginModal from './Modals/LoginModal';
import RegisterModal from './Modals/RegisterModal';
import AllGameSearch from './AllGameSearch';
import { findLastIndex } from 'underscore';
import jwt_decode from "jwt-decode";
import AddGameModalPage from './Modals/AddGameModalPage';
import './GameUIStyles.css';


function GameUI(props)
{
    //alert(props.gameName);
    
    const location = useLocation();
    let navigate = useNavigate();
    //let dynamicGame;
    const [dynamicGame,setDynamicGame] = useState(<div></div>);
    
    const [name, setName] = useState('');
    const [platforms, setPlat] = useState('');
    const [genres, setGenres] = useState('');
    const [image, setImage] = useState('');
    const [description, setDes] = useState('');
    const [show, setShow] = useState(false);
    const [loggedIn, setLog] = useState(false);
    const [data, setData] = useState({});
    const [dynamicModal, setModal] = useState(<div></div>);
    
    


    function goBack()
    {
       navigate("/games");
    }

    useEffect(() => 
    {
        let isActive = true;
        console.log("useeffect ran");
        //are we logged in?
        let ud = localStorage.getItem('user');
        let userId;

        if(ud)
        {
            //let decoded = jwt_decode(ud);
            //userId = decoded.user[0]._id;
            if(isActive)
            {
                setLog(true);
            }
    
        }
        else
        {
    
        }
        if(location.state === null)
        {
            //run game search for name?
            (async () => {
                
            console.log("we're calling the allgamessearch api");
            let obj = {name: props.gameName};

            let js = JSON.stringify(obj);
            //await new Promise(resolve => setTimeout(resolve, 1000));
            try
            {
                const response = await fetch(buildPath('api/games/searchAllGames'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
    
                if (response.status === 404)
                {
                    alert('No game found');
                    return;
                }
                let txt = await response.text();
                let searchList = JSON.parse(txt);
                console.log(typeof(searchList[0])); 
                console.log(searchList[0].name);
                console.log(searchList[0].image);
                console.log(searchList[0].description);
            
                

                //alert(searchList[0].cover);
                if(isActive)
                {
                    // setDynamicGame(<div>name: {searchList[0].name}<br/>
                    //                     platforms: {searchList[0].platforms.join(', ')}<br/>
                    //                     genre: {searchList[0].genres.join(', ')}<br/>
                    //                     img: <br/> <img src={searchList[0].image} alt="game cover img"/><br/>
                    //                 </div>)
                    setName(searchList[0].name);
                    setPlat(searchList[0].platforms.join(', '));
                    setGenres(searchList[0].genres.join(', '));
                    setImage(searchList[0].image);
                    setDes(searchList[0].description);
                    setData(searchList[0]);
                    
                }
            }
            catch(e)
            {
                //alert("error!");
                //alert(e.toString());
                
                window.location.href = '/games';
            }
            })();   
        }      
        else
        {
            //we have a game already
            if(isActive)
                {
                    console.log(location.state.data.name);
                    console.log(location.state.data.platforms);
                    console.log(location.state.data.genre);
                    console.log(location.state.data.image);
                    console.log(location.state.data.description);
                    console.log(typeof(location.state.data));
                    // setDynamicGame(<div>name: {location.state.data.name}<br/>
                    //                     platforms: {location.state.data.platforms}<br/>
                    //                     genre: {location.state.data.genre}<br/>
                    //                     img: <br/><img src={location.state.data.image} alt="game cover img"/><br/>
                    //                 </div>)

                    setName(location.state.data.name);
                    setPlat(location.state.data.platforms);
                    setGenres(location.state.data.genre);
                    setImage(location.state.data.image);
                    setDes(location.state.data.description);
                    setData(location.state.data);
                    
                }
            

        }
        //clean up dem memory leaks???
        return () => 
        {
            isActive = false;
        };

    }, [location, props.gameName]);

    const app_name = 'my-game-list-front'

    function buildPath(route)
    {
        if (process.env.NODE_ENV === 'production')
        {
            return 'https://' + app_name +  '.herokuapp.com/' + route;
        }
        else
        {
            return 'http://localhost:5000/' + route;
        }
    }
    

    const goToHome = async event =>
    {
        window.location.href = '/';
    }
    const handleBoolean = () => 
    {
        setShow(false);
    }
    const handleShow = async () => 
    {
        //alert("are ya winn");
        if(!show)
        {
            setShow(true);
        
            setModal(<AddGameModalPage
                show={true}
                rowData={data}
                handleBoolean={handleBoolean}
                loggedIn={loggedIn}
                handleClose={handleClose}
            />);
        }
    }
    const handleClose = () => 
    {
        
        setShow(false);
    }

    //alert(location.state.data.id); //we check to see if state is null to determine if we got here from a modal or manually

    return(
        <div>
        {/* <Button variant="dark" class="buttons"
                        onClick={()=> goBack()}>Back</Button> */}
            <div className='content'>
                <div className='text-wrapper'>
                    <img className='pic' src={image} alt="game cover img"/>
                    
                    <p><h2>Name: {name}</h2><br/>
                        Platforms: {platforms} <br/><br/>
                        Genres: {genres} <br/><br/></p>
                        
                    <div className='info'><p className='description'>Description: {description}<br/></p></div>
                    <Button className='btn btn-home' variant="primary" onClick={handleShow}>
                                    Rate Game
                    </Button>
                {show && dynamicModal}
               

                
                        
            
                </div>
            </div>
        
        {/* <br/>
        <br/>
        <br/>
        <br/> */}
        {/* {dynamicGame} */}
{/*         
        
        Name: {name}<br/>
        Platforms: {platforms} <br/>
        Genres: {genres} <br/>
        Description: {description}<br/>
        <Button variant="primary" onClick={handleShow}>
                                    Rate Game
                            </Button>
                {show && dynamicModal}
        Image: 
        <br/> <img src={image} alt="game cover img"/><br/> */}
        
        </div>
    );

}

export default GameUI

