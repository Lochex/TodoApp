const winston = require('winston');
const Todo = require('../models/TodoItem');
const Task = require('../models/TodoTasks');

const errorMessage = { message: 'Error occured' };
module.exports = {
  createTodoTask(req, res) {
    const todoId = req.params.todo_id;

    Todo.findById(todoId.toString())
    .then((todo) => {
      if (!todo) {
        return res.status(400).json({
          message: 'Todo not found'
        });
      }
      return new Task({
        content: req.body.content,
        complete: false,
        priorityLevel: req.body.priorityLevel || 'normal',
        todoItem: req.params.todo_id,
        due: req.body.due,
        owner: req.decoded._id
      }).save()
      .then((task) => {
        return res.status(201).send(task);
      })
      .catch(error => res.status(500).send({ message: 'Server error', error }));
    })
    .catch(error => res.status(500).send({ message: 'Server error', error }));
  },

  getAllTodoTasks(req, res) {
    return Todo.findById(req.params.todo_id)
      .then(todo => Task.find({ todoItem: todo.id }).sort({ createdAt: -1 })
        .then((tasks) => {
          res.status(200).send(tasks);
        })
        .catch(error => res.status(400).send(errorMessage)))
      .catch(error => res.status(400).send({ message: 'Todo does not exist' }));
  },

  getTodoTask(req, res) {
    return Task.findById(req.params.task_id)
      .then((task) => {
        res.status(200).send(task);
      })
      .catch(error => res.status(400).send(errorMessage));
  },

  updateTodoTask(req, res) {
    return Task.findById(req.params.task_id)
      .then((task) => {
        if (!task) {
          return res.status(404).json({
            message: 'Task not found'
          });
        }
        task.content = req.body.content || task.content;
        task.priorityLevel = req.body.priorityLevel || task.priorityLevel;
        task.complete = req.body.complete || false;
        task.updatedAt = Date.now();
        task.save().then(task => res.status(200).send(task))
        .catch(error => res.status(400).send(errorMessage));
      })
      .catch(error => res.status(400).send({ message: 'Task with ID not found' }));
  },

  deleteTodoTask(req, res) {
    Task.remove({ _id: req.params.task_id })
      .then(task => res.status(201).send({ message: 'Task Deleted' }))
      .catch(error => res.status(400).send({ message: 'Task does not exist' }));
  },
};
