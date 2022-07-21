// server requirements to run
const express = require('express');
const path = require('path');
const request = require('request');
const steam_router = express.Router()
const Rawger = require('rawger');


const{app, STEAM_WEB_API_KEY} = require("../db");

//steam api post
steam_router.post('/getSteamGames', async (req, res) => 
{
  // incoming: userId, steamId
  // outgoing: appId, playtime
  const url = 'https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?'
              + 'key=' + STEAM_WEB_API_KEY + '&steamid=' + req.body.steamId;

  request.get(url, function(error, steamResponse, steamBody) {
    res.setHeader('Content-Type', 'application/json');
    res.send(steamBody);
  });
});

steam_router.get('/getAllGames', async (req, res) =>
{
  const url = 'https://api.steampowered.com/ISteamApps/GetAppList/v2/';

  request.get(url, function(error, steamResponse, steamBody) {
    res.setHeader('Content-Type', 'application/json');
    res.send(steamBody);
  })
});

steam_router.post('/getGameInfo', async(req, res) =>
{
  try 
  {
    let gameId = req.body.appid;
    let url = 'https://store.steampowered.com/api/appdetails?appids=' + gameId;
    request.get(url, function(error, steamResponse, steamBody) {
      try
      {
        //console.log('try' + steamBody);
        var gameInfo = JSON.parse(steamBody);
      }
      catch
      {
        //console.log('catch' + steamBody);
        return res.status(404).send(toString(gameId));
      }

  
      if(!gameInfo[gameId].success)
      {
        res.status(404).send({gameId: gameId});
      }
      else if(gameInfo[gameId].data === undefined)
      {
        //console.log(gameId);
        res.status(404).send({gameId: gameId});
      }
      else
      {
        let tempInfo = {
          name: '',
          steam_appid: '',
          genres: [],
          header_image: '',
          release_date: ''
        }
    
        for(const k of Object.keys(tempInfo)) 
        {
          if (k in gameInfo[gameId].data)
          {
            if (k === 'genres')
            {
              for(const i of gameInfo[gameId].data[k])
              {
                tempInfo[k].push(i['description']);
              }
            }
            else if (k === 'release_date')
            {
              tempInfo[k] = gameInfo[gameId].data[k].date;
            }
            else
            {
              tempInfo[k] = gameInfo[gameId].data[k];
            }
          }
        }
  
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(tempInfo));
      }
    })  
  }
  catch (e)
  {
    res.status(404).send(e);
  }
});

module.exports = steam_router;