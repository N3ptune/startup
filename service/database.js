const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('draftmagic');
const userCollection = db.collection('user');
const deckCollections = db.collection('deck');

(async function testConnection() {
    try {
      await db.command({ ping: 1 });
      console.log(`Connect to database`);
    } catch (ex) {
      console.log(`Unable to connect to database with ${url} because ${ex.message}`);
      process.exit(1);
    }
  })();
  
  function getUser(email) {
    return userCollection.findOne({ email: email });
  }
  
  function getUserByToken(token) {
    return userCollection.findOne({ token: token });
  }
  
  async function addUser(user) {
    await userCollection.insertOne(user);
  }
  
  async function updateUser(user) {
    await userCollection.updateOne({ email: user.email }, { $set: user });
  }

  async function sendDeck(deck){
    await deckCollections.insertOne(deck);
  }

  async function getDeck(deck, user, date){
    return deckCollections.findOne(deck);
  }

  module.exports = {
    getUser,
    getUserByToken,
    addUser,
    updateUser,
    sendDeck
  };