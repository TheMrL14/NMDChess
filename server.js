//hier gebeurt de server shit


const express = require('express')
const app = express()
const port = 3000
const path = require("path");


app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/app', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/app.js'));
});

app.get('/indexJS', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.js'));
});

app.get('/settings', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/settings.json'));
});

app.get('/style', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.css'));
});

app.get('/chat', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/test.html'));
});


let init = () => {
  app.listen(port, () => console.log(`App listening on port ${port}!`));

};

init();