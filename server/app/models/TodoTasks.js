// app/models/TodoTask.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

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