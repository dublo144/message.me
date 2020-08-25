const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: true
  },
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  likes: Number,
  dislikes: Number
});

messageSchema.plugin(autopopulate);

module.exports = mongoose.model('Message', messageSchema);
