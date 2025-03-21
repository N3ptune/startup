const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const e = require('express');
const app = express();

const authCookieName = 'token';

let users = {};
let decks = [[]];
let pack = [];
let sessionList = [];

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json);

app.use(cookieParser);

app.use(express.static('public'));

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

apiRouter.post('/lobby/create', async (req, res) => {
    const session = {creatorName:req.body.creatorName, playerNum:req.body.playerNum};
    sessionList.push(session);
})


async function createUser(email, password){

}

async function findUser(field, value){

}

function setAuthCookie(res, authToken){

}

function updateDecks(newDeck){

}