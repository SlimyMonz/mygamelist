// server requirements to run
const express = require('express');
const igdb_router = express.Router()
const axios = require('axios');
const{authenticate_token, jwt, initial_key} = require('../authentication')

const{app, TWITCH_ACCESS_TOKEN, TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET} = require("../db");
    
//Get details about games
igdb_router.post('/getGameInfo', authenticate_token, async (req, res) => 
{
    try
    {    
        jwt.verify(req.token, initial_key, async (err, authData) =>{
            if(err)
            {
                res.sendStatus(403)
            }
            else
            {
                let response = await axios({
                    url: 'https://api.igdb.com/v4/games',
                    method: 'POST',
                    headers: {
                        'Client-ID': TWITCH_CLIENT_ID,
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + TWITCH_ACCESS_TOKEN
                    },
                    data: 'fields id, name, storyline, cover.url, platforms.name, genres.name, first_release_date; limit 300; where name = ("' + req.body.gameNames + '");'
                })
                
                const gameInfoArray = [];

                //Organizes the data into an array of objects that match the database
                await (async () => 
                {
                    for(const game of response.data)
                    {   
                        let tempInfo = {
                            name: '',
                            genres: [],
                            releaseDate: '',
                            platforms: [],
                            image: '',
                            id: '',
                            description: '',
                            averageRating: ''
                        }

                        let keySchema = {
                            name: '',
                            genres: [],
                            first_release_date: '',
                            platforms: [],
                            cover: '',
                            id: '',
                            storyline: ''
                        }
    
                        for(const k of Object.keys(keySchema)) 
                        {
                            if (k in game)
                            {
                                if (k === 'genres')
                                {
                                    for(const i of game[k])
                                    {
                                        tempInfo[k].push(i['name']);
                                    }
                                }
                                else if (k === 'platforms')
                                {
                                    for(const i of game[k])
                                    {
                                        tempInfo[k].push(i['name']);
                                    }
                                }
                                else if (k === 'storyline')
                                {
                                    tempInfo['description'] = game[k];

                                }
                                else if (k === 'first_release_date')
                                {
                                    const unixTime = game[k];
                                    const date = new Date(unixTime*1000);
    
                                    tempInfo['releaseDate'] = date.toLocaleDateString('en-US');
                                }
                                else if (k === 'cover')
                                {
                                    tempInfo['image'] = game[k].url;
                                }
                                else
                                {
                                    tempInfo[k] = game[k];
                                }
                            }
                        }
    
                    gameInfoArray.push(tempInfo);
                    }
                })();

                res.status(200).send(gameInfoArray);
            }
        });
    }
    catch (e)
    {
        res.status(404).send(e);
    }
});

module.exports = igdb_router;