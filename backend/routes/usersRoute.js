// modules
const mongoose = require('mongoose');
const {client, express} = require("../db");
const {jwt, initial_key} = require("../authentication")
const bcrypt = require('bcrypt');
const { json } = require('body-parser');
const { response } = require('express');

//router to export
const users_router = express.Router();

//register api
users_router.post('/register', async (req, res) =>{

  try{
    //hash password, 10 rounds of salting (default)
    const hashed_password = await bcrypt.hash(req.body.password, 10)
    
    // new user data 
    let  _id = new mongoose.Types.ObjectId()
    let  firstName = req.body.firstName
    let  lastName = req.body.lastName
    let  userName = req.body.userName
    let  email = req.body.email
    
    const db = client.db("MyGameListDB");

    const usernameCheck = await db.collection('Users').find({userName: userName}).toArray();
    const emailCheck = await db.collection('Users').find({email: email}).toArray();

    if (usernameCheck.length > 0 && emailCheck.length > 0)
    {
      res.status(409).send('Username and email already exists');
    }
    else if (usernameCheck.length > 0)
    {
      res.status(409).send('Username already exists');
    }
    else if (emailCheck.length > 0)
    {
      res.status(409).send('Email already exists');
    }
    else
    {
      // insert new user into database
      const add_user = await db.collection('Users').insertOne({
        _id:_id,
        firstName:firstName, 
        lastName:lastName,
        password:hashed_password,
        email:email, 
        userName: userName,
        games: [],
        verified: false,
        createdAt: new Date()
      })
      res.status(200).json({
        message: "Registered new user",
        userId: add_user.insertedId,
        email: email,
        firstName: firstName
      });
    }
  }catch{
    res.sendStatus(500).send("Internal Server Error")
  }
})

//login api
users_router.post('/login', async (req, res) => {

  try{
    //connect to and access db
    const db = client.db("MyGameListDB");
    
    const user = {userName: req.body.userName}
    // 0 means false here, could be changed to "false" later maybe?
    const RETURN_USER = await db.collection('Users').find(user).project({games: 0}).toArray()

    if(RETURN_USER.length == 0){
      return res.status(400).send("cannot find user")
    }

    else if (!RETURN_USER[0].verified)
    {
      res.status(401).send('Your account is not verified');
    }

    else
    {
      const password = String(req.body.password)
      const hash = String(RETURN_USER[0].password)
      delete RETURN_USER[0].password;

      try{
        const validPassword = await bcrypt.compare(req.body.password, hash);

        console.log(password + " = " + hash + " ?")
        console.log(validPassword)

        if (validPassword == false) return res.status(400).send('Invalid username or Password.')

        jwt.sign({user:RETURN_USER}, initial_key, (err, token) =>{
          res.status(200).json({
             token:token
           });
         })

      }catch{
        res.status(401).send("authorization error")
      }  
    }

  }catch{
    res.status(500).send("Internal Server Error")
  } 
  
});

//Search the database for the user and change verify field to true
users_router.post('/verify', async (req, res) =>
{
  //incoming: verifyId
  try
  {
    let userId = mongoose.Types.ObjectId(req.body.verifyId);
    const db = client.db("MyGameListDB");
    const verify_user = await db.collection('Users').updateOne({_id:userId}, { $set: {verified: true}});
  
    if (verify_user.matchedCount === 0 && verify_user.modifiedCount === 0)
    {
      res.status(404).send({message: 'Could not find user to verify'});
    }
    else if (verify_user.matchedCount === 1 && verify_user.modifiedCount === 0)
    {
      res.status(409).send({message: 'The user was found, but could not be verified'});
    }
    else
    {
      res.status(200).send({message: 'Thank you for verifying!'});
    }
  }
  catch (e)
  {
    res.status(404).send({message: e});
  }
})

//Search the database for the user and change their password
users_router.post('/passwordReset', async (req, res) =>
{
  //incoming: userId, password
  try
  {
    const hashed_password = await bcrypt.hash(req.body.password, 10)

    let userId = mongoose.Types.ObjectId(req.body.userId);
    const db = client.db("MyGameListDB");
    const reset_password = await db.collection('Users').updateOne({_id:userId}, { $set: {password: hashed_password}})

    if (reset_password.matchedCount === 0 && reset_password.modifiedCount === 0)
    {
      res.status(404).send({message: 'Could not find user to change password'});
    }
    else if (reset_password.matchedCount === 1 && reset_password.modifiedCount === 0)
    {
      res.status(409).send({message: 'The user was found, but password could not be changed'});
    }
    else
    {
      res.status(200).send({message: 'Password changed!'});
    }
  }
  catch (e)
  {
    res.status(404).send({message: e});
  }
})

module.exports = users_router
