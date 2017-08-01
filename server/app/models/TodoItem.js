// app/models/TodoItem.js

const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;

var TodoItemSchema   = new Schema({
    title: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    owner: {type: Schema.ObjectId, ref: 'TodoItem', required: true}

});

module.exports = mongoose.model('TodoItem', TodoItemSchema);