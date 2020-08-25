const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const conversationSchema = new Schema({
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  name: String,
  description: String
});

module.exports = mongoose.model('Conversation', conversationSchema);
