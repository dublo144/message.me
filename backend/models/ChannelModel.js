const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const channelSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  admins: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Message'
    }
  ]
});

module.exports = mongoose.model('Channel', channelSchema);
