// app/models/TodoTask.js
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TodoTaskSchema = new Schema({
    content: { type: String, required: true, unique: true },
    complete: { type: Boolean, default: false, required: true },
    priorityLevel: {
        type: String,
        enum: ['normal', 'urgent', 'critical'],
        default: 'normal'
    },
    due: { type: Date },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    todoItem: { type: Schema.ObjectId, ref: 'TodoItem', required: true }
});

module.exports = mongoose.model('TodoTask', TodoTaskSchema);
