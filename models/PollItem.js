const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PollItemSchema = new Schema({
  pos: {
    type: String,
    required: true
  }
});

//Create collection and add shema

const PollItem = mongoose.model('PollItem', PollItemSchema)

module.exports = PollItem;