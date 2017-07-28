// app/models/TodoItem.js

const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;

var TodoItemSchema   = new Schema({
    title: String,
    // owner: String

});

module.exports = mongoose.model('TodoItem', TodoItemSchema);