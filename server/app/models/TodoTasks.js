// app/models/TodoTask.js

const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;

var TodoTaskSchema   = new Schema({
    content: String,
    complete: Boolean,
    priorityLevel: {
        type: String,
        enum: ['NORMAL', 'URGENT', 'CRITICAL'],
        default: 'NORMAL'
    },
    todoItem: {type: Schema.ObjectId, ref: 'TodoItem', required: true}

});

module.exports = mongoose.model('TodoTask', TodoTaskSchema);