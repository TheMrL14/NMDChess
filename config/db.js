const mongoose = require('mongoose');

//Map global promises
mongoose.Promise = global.Promise;
//Mongoose Connect
mongoose.connect('mongodb://username:username123@ds227594.mlab.com:27594/chess')
  .then(() => console.log('mongoDB Connected'))
  .catch(err => console.log(err));