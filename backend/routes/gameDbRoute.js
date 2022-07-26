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

        const db = client.db("MyGameListDB");

        const result = await db.collection('Users').updateOne({_id:userID} , { $addToSet: { games: { $each: gameIds}}})
        console.log(result)

        if(result.matchedCount === 0)
        {
          res.status(404).send({message:'Found user, but games were already there'});
        }
        else if(result.matchedCount === 1 && result.modifiedCount === 0)
        {
          res.status(404).send({message:'No user found'});
        }
        else
        {
          res.status(200).json({message:'Steam games added to user list' , authData});
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
  // 
  //
  try
  {
    jwt.verify(req.token, initial_key, async (err, authData) =>{
      if(err){
        res.sendStatus(403)
      }else{
  
        let games = req.body.gamesToAdd;
        //console.log(games);

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
  try
  {
    jwt.verify(req.token, initial_key, async (err, authData) =>{
      if(err){
        res.sendStatus(403)
      }else {
        // incoming: id
        // outgoing: An array of objects that contain {id: game's _id, rating: user's rating of game}
  
        let _id = mongoose.Types.ObjectId(req.body._id);
  
        const response = await db.collection('Users').find({_id:_id}).toArray();
        
        let results = [];
  
        if (response.length > 0)
        {
          response[0].games.forEach((game) => 
          {
              temp = 
              {
                  name: game.id,
                  rating: game.rating
              }
              
              results.push(temp);
          });
  
          console.log("made it through verify")
          res.status(200).json(results);
  
        }else {
          res.sendStatus(404)
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
      ... (req.body.genre !== undefined) && { genre : { $all: req.body.genre}},
      ... (req.body.name !== undefined) && { name : {$regex: req.body.name, $options: 'i'}},
      ... (req.body.platform !== undefined) && { platform : { $all: req.body.platform}},
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
              id: game._id,
              name: game.name,
              description: game.description,
              rating: game.averageRating,
              release: game.year,
              genre: game.genre,
              platforms: game.platform,
              userCount: game.userCount,
              cover: game.image
          }
          //console.log(genre);
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
gameDbRoute_router.post('/updateGamesList', authenticate_token, async (req, res) =>{

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
    console.log(response);
    const haveIds = response.map(game => (game._id.toString()));
    console.log(response);
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
