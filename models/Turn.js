const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Turn = new Schema({
  locked: {
    type: boolean,
    required: true
  }
});

//Create collection and add shema

const locked = mongoose.model('locked', Turn)

module.exports = PollItem;