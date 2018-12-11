//hier gebeurt de server shit




const express = require('express');
const io = require('socket.io-client');
const app = express()
const port = process.env.PORT || 3000;
const path = require("path");
const socket = io.connect('ws://nmd18.herokuapp.com', {
  reconnect: true
});


app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/app', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/script/app.js'));
});

app.get('/dataStreamJS', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/script/dataStream.js'));
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