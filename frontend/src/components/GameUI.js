import React, { useState, useEffect } from 'react';
import {Navigate, useLocation, useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ModalComponent from './Modals/ModalComponent';
import LoginModal from './Modals/LoginModal';
import RegisterModal from './Modals/RegisterModal';
import AllGameSearch from './AllGameSearch';
import { findLastIndex } from 'underscore';

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


    function goBack()
    {
       navigate("/games");
    }

    useEffect(() => 
    {
        let isActive = true;
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
                console.log(searchList[0].name);
                console.log(searchList[0].image);
            
                

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

                }
            }
            catch(e)
            {
                alert("error!");
                alert(e.toString());
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
                    // setDynamicGame(<div>name: {location.state.data.name}<br/>
                    //                     platforms: {location.state.data.platforms}<br/>
                    //                     genre: {location.state.data.genre}<br/>
                    //                     img: <br/><img src={location.state.data.image} alt="game cover img"/><br/>
                    //                 </div>)

                    setName(location.state.data.name);
                    setPlat(location.state.data.platforms);
                    setGenres(location.state.data.genre);
                    setImage(location.state.data.image);
                }
            

        }
        //clean up dem memory leaks???
        return () => 
        {
            isActive = false;
        };

    }, [location]);

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

    //alert(location.state.data.id); //we check to see if state is null to determine if we got here from a modal or manually

    return(
        <div>
        {/* <Button variant="dark" class="buttons"
                        onClick={()=> goBack()}>Back</Button> */}
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        {/* {dynamicGame} */}
        
        Name: {name}<br/>
        PLatforms: {platforms} <br/>
        Genres: {genres} <br/>
        Image: 
        <br/> <img src={image} alt="game cover img"/><br/>
        </div>
    );

}

export default GameUI

