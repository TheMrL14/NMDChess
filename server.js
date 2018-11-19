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

app.get('/settings', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/settings.json'));
});


let init = () => {
  app.listen(port, () => console.log(`App listening on port ${port}!`));

};

init();
