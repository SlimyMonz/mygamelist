// server requirements to run
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const env = require('dotenv').config();
const request = require('request');

// constants
const PORT = process.env.PORT;
const URL = process.env.MONGODB_URI;
const app = express();
const STEAM_WEB_API_KEY = process.env.STEAM_WEB_API_KEY;
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID;
TWITCH_CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET;
TWITCH_ACCESS_TOKEN = process.env.TWITCH_ACCESS_TOKEN;

// database stuff
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(URL);

const connectDB = async ()=>{
    try {
        // initialize
        app.set('port', PORT);
        app.use(cors());
        app.use(bodyParser.json());

        // connect to the database
        await client.connect();

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

// exports
module.exports = {
    connectDB,
    express,
    bodyParser,
    cors,
    path,
    env,
    PORT,
    URL,
    STEAM_WEB_API_KEY,
    SENDGRID_API_KEY,
    TWITCH_ACCESS_TOKEN,
    TWITCH_CLIENT_SECRET,
    TWITCH_CLIENT_ID,
    app,
    client,
    request
};