const mongoose = require('mongoose')
const Todo = require('../models/TodoItem');
const Task = require('../models/TodoTasks');

const errorMessage = { message: "Error occured" };
module.exports = {
  createTodoItem(req, res) {
    return new Todo({
        title: req.body.title,
      }).save()
      .then(todo => res.status(201).send(todo))
      .catch(error => res.status(400).send(error));
  },
  getTodoItem(req, res) {
    return Todo.findById(req.params.todo_id)
      .then(todo => res.status(201).send(todo))
      .catch(error => res.status(400).send(error));
  },
  getAllTodoItems(req, res) {
    return Todo.find()
      .then(todos => res.status(201).send(todos))
      .catch(error => res.status(400).send(error));
  },
  updateTodoItem(req, res) {
    Todo.findById(req.params.todo_id)
      .then((todo) => {
        if(!todo) {
          return res.status(404).json({
            message: 'Todo not found'
          })
        };
        todo.title = req.body.title;
        todo.save().then((todo) => res.status(200).send(todo))
        .catch(error => res.status(400).send(error));
      }).catch(error => res.status(400).send(error));
  },
  deleteTodoItem(req, res) {
    Todo.remove({_id: req.params.todo_id})
      .then(todo => res.status(201).send({message: "Todo Deleted"}))
      .catch(error => res.status(400).send(error));
  },
  createTodoTask(req, res) {
   var  id = mongoose.Types.ObjectId(req.params.todo_id);
    return Todo.findById(id).then(response => {
      return new Task({
              content: req.body.content,
              complete: false,
              priorityLevel: req.body.priorityLevel,
              todoItem: id
            }).save()
            .then(task => res.status(201).send(task))
            .catch(error => res.status(400).send(error));
  })
  },
  getAllTodoTasks(req, res) {
    return Todo.findById(req.params.todo_id)
      .then(todo => {
        return Task.find({todoItem: todo.id})
        .then((task) => {
          res.status(200).send(task);
        })
      })
      .catch(error => res.status(400).send(error));
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
        if(!task) {
          return res.status(404).json({
            message: 'Task not found'
          })
        };
        task.content = req.body.content;
        task.priorityLevel = req.body.priorityLevel;
        task.save().then((task) => res.status(200).send(task))
        .catch(error => res.status(400).send(errorMessage));
      })
      .catch(error => res.status(400).send(errorMessage));
  },
  deleteTodoTask(req, res) {
    Task.remove({_id: req.params.task_id})
      .then(task => res.status(201).send({message: "Task Deleted"}))
      .catch(error => res.status(400).send(errorMessage));
  },
};