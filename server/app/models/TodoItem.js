// app/models/TodoItem.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TodoItemSchema   = new Schema({
    title: String,
    tasks:  [{ type: Schema.Types.ObjectId, ref: 'TodoTask' }]

});

module.exports = mongoose.model('TodoItem', TodoItemSchema);