var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
  username: {type: String, required: true},
  message: {type: String, required: true},
  created: Date,
  isLog: {type: Boolean, default: false}
});

var Message = mongoose.model('message', messageSchema);

module.exports = Message;