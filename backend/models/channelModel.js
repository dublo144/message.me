const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');

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
      ref: 'User',
      autopopulate: true
    }
  ],
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
      autopopulate: true
    }
  ]
});

channelSchema.plugin(autopopulate);

module.exports = mongoose.model('Channel', channelSchema);
