// app/models/TodoItem.js
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TodoItemSchema = new Schema({
    title: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    owner: { type: Schema.ObjectId, ref: 'User', required: true }

});

module.exports = mongoose.model('TodoItem', TodoItemSchema);
