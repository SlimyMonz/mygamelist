import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ModalComponent from './Modals/ModalComponent';
import LoginModal from './Modals/LoginModal';
import RegisterModal from './Modals/RegisterModal';
import AllGameSearch from './AllGameSearch';
import jwt_decode from "jwt-decode";
import './GameSearchUIStyles.css'



function GameSearchUI()
{

    let game = '';
    let search = '';
    let name = '';
    let steamId = '';

    const [message,setMessage] = useState('');
    const [searchResults,setResults] = useState('');
    const [gameList,setGameList] = useState('');
    const [gamesList,setGamesList] = useState('');


    let ud = localStorage.getItem('user');
    
    let firstName;
    let lastName;
    let userId;

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

    //Get names of imported Steam games based on array of appid's
    const getGameNames = async (appIdList) => 
    {
        const response = await fetch(buildPath('api/Steam/getAllGames'),
            {method:'GET', mode: 'cors', headers:{'authorization': 'Bearer ' + ud}});

        let txt = await response.text();
        let gamesList = JSON.parse(txt);
        // console.log(appIdList);
        let parsedGames = await parseGameNames(appIdList, gamesList)

        return parsedGames;
    }

    //Match Steam appid's with names
    const parseGameNames = (appIdList, gamesList) =>
    {
        let parsedGames = [];

        appIdList.response.games.filter(function(game1) {
            let temp = gamesList.applist.apps.find((game2) => game1.appid === game2.appid);

            if (typeof(temp) === 'object') 
            {
                parsedGames.push(temp.name);
            }
        });

        return parsedGames;
    }

    //Add games to the "Games" collection
    const addGameToGamesTable  = async (gamesToAdd) =>
    {
        try
        {
            let js = JSON.stringify({gamesToAdd: gamesToAdd});

            const response = await fetch(buildPath('api/games/addGameData'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json', 'authorization': 'Bearer ' + ud}});

            if (response.status === 404)
            {
                alert('Games failed to add to Games database');
                return;
            }

            let txt = await response.text();
            let res = JSON.parse(txt);

            return res;
        }
        catch (e)
        {
            alert(e.toString());
        }
    }

    //Import the user's Steam games and populate datatables if needed
    const getGamesList = async event =>
    {
        event.preventDefault();

        let obj = {userId:userId,steamId:steamId.value,token:ud};
        let js = JSON.stringify(obj);

        try
        {
            const response = await fetch(buildPath('api/steam/getSteamGames'),
                {method:'POST', mode: 'cors',body:js,headers:{'authorization': 'Bearer ' + ud, 'Content-Type': 'application/json'}});

            let txt = await response.text();
            let res = JSON.parse(txt);

            let fullList = await getGameNames(res);
            let checkedList = await checkDbForGames(fullList);
            let newGameData = await getGameInfo(checkedList.needData);
            let gameinDb = checkedList.haveIds;

            await (async() =>
            {
                //There are new games to add to the Games collection
                //No games to be imported are in the collection
                if(newGameData.length > 0 && gameinDb.length === 0)
                {
                    let gamesWereAdded = await addGameToGamesTable(newGameData);
                    let final = await addUserGames(gamesWereAdded.insertedIds, []);
                }
                //No new games to add to the Games collection
                //All games needed are already in the collection
                else if (newGameData.length === 0 && gameinDb.length > 0)
                {
                    let final = await addUserGames([], gameinDb);
                }
                //There are new games to add to the Games collection
                //There are also imported games already in the collection
                else if (newGameData.length > 0 && gameinDb.length > 0)
                {
                    let gamesWereAdded = await addGameToGamesTable(newGameData);
                    let final = await addUserGames(gamesWereAdded.insertedIds, gameinDb);
                }     
                //No games to import or add to database
                else if (newGameData.length === 0 && gameinDb.length === 0) 
                {
                    alert('No games to add');
                    return;
                }
            })();
                
            alert('Steam games added to list');
            return;
        }
        catch(e)
        {
            alert(e.toString());
            setResults(e.toString());
        }
    };

    //Add games to a user's games list
    const addUserGames = async (newIds, hadIds) =>
    {
        let listOfIds = Object.values(newIds);
        let totalList = listOfIds.concat(hadIds);
        let newList = await totalList.map(newIds => ({ id: newIds}));

        let js = JSON.stringify({_id: userId, gameIds: newList});
        const response = await fetch(buildPath('api/games/addUserGames'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json', 'authorization': 'Bearer ' + ud}});

        return response;
    }

    //Check the "Games" collection to see if we need to grab game data from IGDB
    const checkDbForGames = async (fullList) =>
    {
        try
        {
            let js = JSON.stringify({fullList: fullList});

            const response = await fetch(buildPath('api/games/checkForGames'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json', 'authorization': 'Bearer ' + ud}});

            let txt = await response.text();
            let res = JSON.parse(txt);
            return res;
        }
        catch (e)
        {
            alert(e.toString());
        }
    }

    //Get game data from IGDB
    const getGameInfo = async (gameNameList) =>
    {
        try
        {
            let listAsString = gameNameList.join('", "');
            let js = JSON.stringify({gameNames: listAsString});
            const response = await fetch(buildPath('api/igdb/getGameInfo'),
                {method:'POST', mode: 'cors',body:js,headers:{'Content-Type': 'application/json', 'authorization': 'Bearer ' + ud}});

            let txt = await response.text();
            let res = JSON.parse(txt);
            return res;
        }
        catch (e)
        {
            alert(e.toString());
        }
    }

    /*  Will loop and call the Steam getGameInfo API. Has been replaced with the igdb
        APIs and database, but we should leave here for now in case we want to use it.
    const getGameInfo = async (gameIdList) =>
    {
        const gameInfoArray = [];
        try
        {
            await (async () => 
            {

                //await gameIdList.forEach(async (game) =>
                for(let i = 0; i < 150; i ++)
                {
                    try
                    {
                        
                        let js = JSON.stringify(gameIdList.response.games[i]);
                        const response = await fetch(buildPath('api/steam/getGameInfo'),
                        {method:'POST', body:js, mode: 'cors', headers:{'Content-Type': 'application/json'}});

                        if(response.status === 200)
                        {
                            let txt = await response.text();
                            let res = JSON.parse(txt);
                            gameInfoArray.push(res);
                        }
                        else if(response.status === 404)
                        {
                            let txt = await response.text()
                            throw new Error('Unknown Game [' + i + '] = ' + txt);
                        }
                    }
                    catch (e)
                    {
                        console.log(e.toString());
                    }
                };
            })();
            console.log(gameInfoArray)
        }
        catch (e)
        {
            alert(e.toString());
        }
    }
    */

    const goToHome = async event =>
    {
        window.location.href = '/';
    }
   

    let dynamic_game_search;


    if(ud)
    {
        dynamic_game_search =

       
            <div className ='form-container' id="gameUIDiv" >
                
                <form>   
                    <div className='steamSearch'>          
                        <input className="form-control" type="text" id="requestSteamIDText" placeholder="Enter your Steam ID"
                            ref={(c) => steamId = c} />
                        <Button variant="primary" id="requestSteamIDBtn" onClick={getGamesList}>Get Games</Button>
                    </div>
                    {/* <span id="gamesListResult">{message}</span> */}
                    {/* nats comment */}
                    <AllGameSearch/>
                </form>
            </div>


    }
    else
    {

        dynamic_game_search =

            <div className='reg-div'id="gameUIDiv">
               
                {/*nats comment <p id="gameList">{gameList}</p> */}

                <AllGameSearch/>
            </div>;
    }

    return(
        <div>
            {dynamic_game_search}
        </div>
    );
}

export default GameSearchUI;
