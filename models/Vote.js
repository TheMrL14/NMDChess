const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VoteSchema = new Schema({
  pos: {
    type: String,
    required: true
  },

  points: {
    type: String,
    required: true
  },
});

//Create collection and add shema

const Vote = mongoose.model('Vote', VoteSchema)

module.exports = Vote;