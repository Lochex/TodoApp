const winston = require('winston');
const Todo = require('../models/TodoItem');
const Task = require('../models/TodoTasks');

const errorMessage = { message: 'Error occured' };
module.exports = {
  createTodoItem(req, res) {
    if (req.body.title) {
      Todo.findOne({ title: req.body.title }).then((todoItem) => {
        if (todoItem) {
          return res.status(400).send({ message: 'Todo with title already exists' });
        }
        return new Todo({
          title: req.body.title,
          owner: req.decoded._id
        }).save()
          .then(todo => res.status(201).send(todo))
          .catch(error => res.status(400).send(error));
      }).catch(error => res.status(400).send(error));
    } else {
      return res.status(400).send({
        message: 'Title field is required'
      });
    }
  },
  getTodoItem(req, res) {
    console.log(req.params.todo_id, 'request params id ----->');
    return Todo.findById(req.params.todo_id)
      .then((todo) => {
        res.status(200).send(todo);
      })
      .catch(() => res.status(400).send(errorMessage));
  },

  getAllTodoItems(req, res) {
    return Todo.find().where('owner').equals(req.decoded._id)
      .then(todos => res.status(200).send(todos))
      .catch(error => res.status(400).send(error));
  },

  getUserTodoItems(req, res) {
    const id = req.decoded._id;
    if (req.params.userId !== id) {
      return res.status(400).send({ message: 'Unauthorized access' });
    }
    return Todo.find({ owner: id })
      .then(todo => res.status(200).send(todo))
      .catch(error => res.status(400).send(errorMessage));
  },

  updateTodoItem(req, res) {
    Todo.findById(req.params.todo_id)
      .then((todo) => {
        if (!todo) {
          return res.status(400).json({
            message: 'Todo not found'
          });
        }
        todo.title = req.body.title;
        todo.save().then(todo => res.status(200).send(todo))
        .catch(error => res.status(400).send(error));
      }).catch(error => res.status(400).send({ message: 'Todo with ID not found' }));
  },
  deleteTodoItem(req, res) {
    Todo.findById(req.params.todo_id)
      .then((todo) => {
        Task.remove({ todoItem: todo._id })
          .then((task) => {
            winston.info('Task removed');
          })
          .catch(error => res.status(400).send({ message: 'No Tasks associated with Todo' }));

        todo.remove({ _id: req.params.todo_id })
          .then((todo) => {
            res.status(201).send({ message: 'Todo Deleted' });
          });
      })
      .catch(error => res.status(400).send({ message: 'Todo not found' }));
  },
};
