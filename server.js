//hier gebeurt de server shit


//var Pusher = require('pusher');
const express = require('express');
const bodyparser = require('body-parser');
const io = require('socket.io-client');
const app = express()
const port = process.env.PORT || 3000;
const path = require("path");
const cors = require('cors');

//DB Config
require('./config/db');


const socket = io.connect('ws://nmd18.herokuapp.com', {
  reconnect: true
});

const poll = require('./routes/poll');
const pollItems = require('./routes/pollItems');


app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/app', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/script/app.js'));
});

app.get('/pollVotesDB', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/script/pollVotesDB.js'));
});

app.get('/pollItemsDB', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/script/pollItemsDB.js'));
});

app.get('/indexJS', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/script/index.js'));
});

app.get('/settings', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/settings.json'));
});

app.get('/style', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.css'));
});

app.get('/chat', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/chat.html'));
});


app.use('/icons', express.static(path.join(__dirname, 'public/Icons')))

app.use(bodyparser.json());

app.use(bodyparser.urlencoded({
  extended: true
}));

app.use(cors());

app.use('/poll', poll);
app.use('/pollItems', pollItems);



let init = () => {

  app.listen(port, () => console.log(`App listening on port ${port}!`));
  setInterval(function() {
    socket.emit("clientvalue", {
      name: "titertX",
      value: Math.round(Math.random() * 10)
    })
  }, 1000);
  setInterval(function() {
    socket.emit("clientvalue", {
      name: "titertY",
      value: Math.round(Math.random() * 10)
    })
  }, 1000);

};

init();