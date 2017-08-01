// app/models/TodoTask.js

const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;

var TodoTaskSchema   = new Schema({
    content: {type: String, required: true},
    complete: {type: Boolean, default: true},
    priorityLevel: {
        type: String,
        enum: ['NORMAL', 'URGENT', 'CRITICAL'],
        default: 'NORMAL'
    },
    due: { type: Date },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    todoItem: {type: Schema.ObjectId, ref: 'TodoItem', required: true}

});

module.exports = mongoose.model('TodoTask', TodoTaskSchema);