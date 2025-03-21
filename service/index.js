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

// Creates a lobby
apiRouter.post('/lobby/create', async (req, res) => {
    const session = {creatorName:req.body.creatorName, playerNum:req.body.playerNum};
    sessionList.push(session);
});

// Creates a user
apiRouter.post('/user/create', async (req, res) => {
    if (await findUser('email', req.body.email)) {
        res.status(409).send({msg: 'Existing User'})
    } else {
        const user = await createUser(req.body.email, req.body.password);

        setAuthCookie(res, user.token);
        res.send({email: user.email});
    }
});

// Login existing user
apiRouter.post('/user/login', async (req, res) => {
    const user = await findUser('email', req.body.email);
    if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
            user.token = uuid.v4();
            setAuthCookie(res, user.token);
            res.send({email: user.email});
            return
        }
    }
    res.status(401).send({msg: 'Unauthorized'});
});

// Logout a user
apiRouter.post('/user/logout', async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
        delete user.token;
    }
    res.clearCookie(authCookieName);
    res.status(204).end();
});

// Middle to verify user authority
const verifyUser = async (req, res, next) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
        next();
    } else {
        res.status(401).send({ msg: 'Unauthorized' });
    }
};


async function createUser(email, password){

}

async function findUser(field, value){

}

function setAuthCookie(res, authToken){

}

function updateDecks(newDeck){

}