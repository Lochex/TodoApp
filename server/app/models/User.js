var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  //provider: { type: String, default: 'basic' },
  status: { type: String, default: 'active' }
});

module.exports = mongoose.model('User', UserSchema)