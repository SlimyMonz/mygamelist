//module import
const jwt = require('jsonwebtoken')

// generic function for generating 64 bit keystrings with hex
const generate_key = function() {
    return require('crypto').randomBytes(64).toString('hex')
}

// we need to be able to look at this value moving forward, so it stays up here
const initial_key = generate_key()

// create token
const get_token = function(user){
  user = user
  return jwt.sign(user, initial_key)
}

// middleware function for authenticating a user on login
const authenticate_token = function(req, res, next){

  const bearerHeader = req.headers['authorization']
  
  if(typeof bearerHeader !== 'undefined'){
    const bearer = bearerHeader.split(' ')
    const bearerToken = bearer[1]
    req.token = bearerToken
    next()
  }else{
    console.log("invalid token");
    res.sendStatus(403)
  }
}

module.exports = 
{
    jwt, generate_key, authenticate_token, get_token, initial_key 
}