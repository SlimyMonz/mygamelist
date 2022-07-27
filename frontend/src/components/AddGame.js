import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ModalComponent from './Modals/ModalComponent';
import LoginModal from './Modals/LoginModal';
import RegisterModal from './Modals/RegisterModal';
import AllGameSearch from './AllGameSearch';
import jwt_decode from "jwt-decode";


async function AddGame(gameIds)
{

    
    let ud = localStorage.getItem('user');
    
    let firstName;
    let lastName;
    let userId;
    let gameIdArray = [gameIds];

    

    if(ud)
    {
        let decoded = jwt_decode(ud);
        userId = decoded.user[0]._id;

    }
    else
    {

    }

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



    //Add games to a user's games list
    const addUserGames = async (userId, gameIds) =>
    {
        let js = JSON.stringify({_id: userId, gameIds: gameIds});
       
        try
        {    
            let build = buildPath('api/games/addUserGames');
            alert(build);
            alert(ud);
            alert(userId);
            alert("game id is: " + gameIds);
            const response = await fetch(buildPath('api/games/addUserGames'),
            {method:'POST',body:js,headers:{'Content-Type': 'application/json', 'authorization': 'Bearer ' + ud}});
            

            if (response.status === 401)
            {
                console.log("did it wait fail?");
                alert(await response.text());
                return;
            }

            console.log("did it wait?");
            return response;
            //let res = JSON.parse(await response.text());

        }
        catch(e)
        {
            alert(e.toString());
        }    
       
    }

    addUserGames(userId, gameIdArray);

    
    return;
    


}

export default AddGame;
