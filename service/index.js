const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();
const DB = require('./database.js');
const { peerProxy } = require('./peerProxy.js');



const authCookieName = 'token';

let users = [];
let decks = [[]];
let pack = [];
let sessionList = [];

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Creates a lobby
apiRouter.post('/lobby/create', async (req, res) => {
    const session = {creatorName:req.body.creatorName, playerNum:req.body.playerNum};
    sessionList.push(session);
});

// Creates a user
apiRouter.post('/auth/create', async (req, res) => {
    console.log('1')
    if (await findUser('email', req.body.email)) {
        res.status(409).send({msg: 'Existing User'})
    } else {
        const user = await createUser(req.body.email, req.body.password);
        setAuthCookie(res, user.token);
        res.send({email: user.email});
        return;
    }
});

// Login existing user
apiRouter.post('/auth/login', async (req, res) => {
    const user = await findUser('email', req.body.email);
    if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
            user.token = uuid.v4();
            await DB.updateUser(user);
            setAuthCookie(res, user.token);
            res.send({email: user.email});
            return;
        }
    }
    res.status(401).send({msg: 'Unauthorized'});
});

// Logout a user
apiRouter.delete('/auth/delete', async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
        delete user.token;
        DB.updateUser(user);
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
    const passwordHash = await bcrypt.hash(password, 10);
    const user = {
        email: email,
        password: passwordHash,
        token: uuid.v4(),
    };
    await DB.addUser(user);
    return user;
}

async function findUser(field, value){
    if (!value) {
        return null;
    }
    if (field === 'token') {
        return DB.getUserByToken(value);
      }
      return DB.getUser(value);
}

function setAuthCookie(res, authToken){
    res.cookie(authCookieName, authToken, {
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
      });
}

// Default error handler
app.use(function (err, req, res, next) {
    res.status(500).send({ type: err.name, message: err.message });
});

app.post('/api/deck', async (req, res) => {
    try {
        const deck = req.body;
        await DB.sendDeck(deck)
        res.status(201).json({ message: 'Deck saved successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to save deck' });
    }
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});



function updateDecks(newDeck){
    // NO LONGER NEEDED
}

// apiRouter.get('/cards/:setCode', async (req, res) => {
//     try {
//         const { setCode } = req.params;
//         const cards = await fetchCards(setCode);
//         res.json(cards);
//     } catch (error) {
//         console.error("Error fetching cards:", error);
//         res.status(500).json({ error: "Failed to fetch cards" });
//     }
// });

const httpService = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

peerProxy(httpService);
