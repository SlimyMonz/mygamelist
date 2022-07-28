// public modules
const {app, client, express} = require("../db");
const gameDbRoute_router = express.Router();
const mongoose = require('mongoose')
const db = client.db('MyGameListDB');
const{authenticate_token, jwt, initial_key} = require('../authentication')

//Very useful JS library
const _ = require('underscore');

//Increase size limit
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

//Add game/games to list of user games
gameDbRoute_router.post('/addUserGames', authenticate_token, async (req, res) =>{
  //incoming: The User's _id, an array of game _id's
  //outgoing: Message
  try
  {
    jwt.verify(req.token, initial_key, async (err, authData) =>{
      if(err){
        res.sendStatus(403)
      }else{
  
        let {_id, gameIds} = req.body
        userID = mongoose.Types.ObjectId(_id)

        console.log(gameIds);
        const db = client.db("MyGameListDB");

        const result = await db.collection('Users').updateOne({_id:userID} , { $addToSet: { games: { $each: gameIds}}})

        if(result.matchedCount === 0)
        {
          res.status(404).send('No user found');
        }
        else if(result.matchedCount === 1 && result.modifiedCount === 0)
        {
          res.status(200).send('Found user, but games were already there');
        }
        else
        {
          res.status(200).send('Game added to list');
        }
      }
    }) 
  }
  catch(e)
  {
    res.status(404).send(e);
  }
})

//Add a game to the Games collection
gameDbRoute_router.post('/addGameData', authenticate_token, async (req, res) =>{
  //incoming: games[{name. genre, releaseDate, image, igdb, description, averageRating}]
  //          Objects don't need to have every field
  //outgoing: Object that contains the _id's of the inserted games 
  try
  {
    jwt.verify(req.token, initial_key, async (err, authData) =>{
      if(err){
        res.sendStatus(403)
      }else{
  
        let games = req.body.gamesToAdd;

        const db = client.db("MyGameListDB");
        const result = await db.collection('Games').insertMany(games)
        
        res.status(200).send(result);
      }
    }) 
  }
  catch(e)
  {
    res.status(404).send(e);
  }
})

//Gets a user's list of games and ratings
gameDbRoute_router.post('/getUserGames', authenticate_token, async (req, res) =>
{
  // incoming: id of user and/or id of game to be retrieved.
  // outgoing: An array of objects that contain all game data and personalRating
  try
  {
    jwt.verify(req.token, initial_key, async (err, authData) =>{
      if(err){
        res.sendStatus(403)
      }else {
  
        let gameId = req.body.gameId;

        const listRes = await db.collection('Users').find({_id : mongoose.Types.ObjectId(req.body._id)}).toArray();

        let ids = [];
        let ratings = [];
        let gameList = [];

        if (listRes.length > 0)
        {
          await (async() =>
          {
            if (gameId !== undefined)
            {
              listRes[0].games.every((game) => {
                if (game.id === gameId) { 
                  gameList.push(game);
                  return false;
                }
                else {
                  return true;
                }
              })
            }
            else
            {
              gameList = listRes[0].games
            }
          })();

          for await (const game of gameList)
          {
            ids.push(mongoose.Types.ObjectId(game.id));
            ratings[game.id] = game.rating;
          };

          const dataRes = await db.collection('Games').find({_id: { $in: ids}}).toArray();

          for await (const game of dataRes)
          {
            game.personalRating = (ratings[game._id] === undefined) ? '0' : ratings[game._id] ;
          };

          res.status(200).json(dataRes);
  
        }else {
          res.sendStatus(404).send('An error occured in /getUserGames')
        }
      }
    })
  }
  catch(e)
  {
    res.status(404).send(e);
  }

});

//Search for game/games given search parameters
gameDbRoute_router.post('/searchAllGames', async (req, res) =>
{
  /* incoming: Any number of the following
  id, averageRating, description, genre[], name, platform [], userCount, year

  outgoing: 
  An array of objects that contains all of the data for every game that matches
  the search results.
  */
  try
  {
    let searchParams = 
    {
      ... (req.body.id !== undefined) && { _id : req.body.id},
      ... (req.body.averageRating !== undefined) && { averageRating : req.body.averageRating},
      ... (req.body.description !== undefined) && { description : req.body.description},
      ... (req.body.genre !== undefined) && { genres : { $all: req.body.genre}},
      ... (req.body.name !== undefined) && { name : {$regex: req.body.name, $options: 'i'}},
      ... (req.body.platform !== undefined) && { platforms : { $all: req.body.platform}},
      ... (req.body.userCount !== undefined) && { userCount : parseInt(req.body.userCount)},
      ... (req.body.year !== undefined) && { year : req.body.year}
    }
  
    const response = await db.collection('Games').find(searchParams).toArray();
      
    let results = [];
  
    if (response.length > 0)
    {
      response.forEach((game) => 
      {
          temp = 
          {
              _id: game._id,
              name: game.name,
              description: game.description,
              rating: game.averageRating,
              release: game.year,
              genres: game.genres,
              platforms: game.platforms,
              userCount: game.userCount,
              image: game.image
          }
          results.push(temp)
      }
    )}
   
  
    res.status(200).json(results)
  }
  catch (e)
  {
    res.status(404).send(e);
  }
  
});

//Updates a User's rating of a game
gameDbRoute_router.post('/updateGamesList', authenticate_token, async (req, res) =>
{
  //incoming: 
  //game id is NOT an array
  jwt.verify(req.token, initial_key, async (err, authData) =>{
    if(err){
      res.sendStatus(403)
    }else {
      let {_id, id, rating} = req.body
      userID = mongoose.Types.ObjectId(_id)

      const response = await db.collection('Users').updateOne({"_id":userID, "games.id":id}, {$set:{"games.$.rating":rating}})

      res.status(200).json(response)}
  })
})

//Delete a game from a User's list
gameDbRoute_router.post('/deleteGame', authenticate_token, async (req, res)=>{
  
  try
  {
    jwt.verify(req.token, initial_key, async (err, authData) =>{
      if(err){
        res.sendStatus(403)
      }else {
        let {_id, id} = req.body
        userID = mongoose.Types.ObjectId(_id)
  
        const response = await db.collection('Users').updateOne({_id:userID}, {$pull: {"games":{id:id}}})
        res.status(200).json({message: "delete successfull"})
      }
    })
  }
  catch(e)
  {
    res.status(404).send(e);
  }

})

//Check if game already exists in Games collection
gameDbRoute_router.post('/checkForGames', async (req, res) =>
{
  try
  {
    let searchParams = req.body.fullList;

    const response = await db.collection('Games').find({ name: { $in: searchParams}}, { projection: { name: 1}}).toArray();
    const haveIds = response.map(game => (game._id.toString()));
    const haveNames = response.map(game => (game.name));
    const needData = _.difference(searchParams, haveNames);

    res.status(200).send({needData: needData, haveIds: haveIds});
  }
  catch (e)
  {
    console.log(e);
    res.status(404).send(e);
  }
  
});

module.exports = gameDbRoute_router;
