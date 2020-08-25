const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');

const Schema = mongoose.Schema;

const privateMessageSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: true
  },
  from: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: true
  },
  date: {
    type: Date,
    required: true
  }
});

privateMessageSchema.plugin(autopopulate);

module.exports = mongoose.model('PrivateMessage', privateMessageSchema);
