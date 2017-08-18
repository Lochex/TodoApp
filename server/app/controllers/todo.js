const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const winston = require('winston');
const Todo = require('../models/TodoItem');
const Task = require('../models/TodoTasks');
const User = require('../models/User');

const errorMessage = { message: "Error occured" };
module.exports = {
  createTodoItem(req, res) {
    if (req.body.title) {
      return new Todo({
          title: req.body.title,
          owner: req.decoded._id
        }).save()
        .then(todo => res.status(201).send(todo))
        .catch(error => res.status(400).send(error));
    } else{
      return res.status(400).send({
        message: 'Title field is required'
      });
    }
  },
  getTodoItem(req, res) {
    return Todo.findById(req.params.todo_id)
      .then(todo => res.status(200).send(todo))
      .catch(error => res.status(400).send(errorMessage));
  },

  getAllTodoItems(req, res) {
    return Todo.find().where('owner').equals(req.decoded._id)
      .then(todos => res.status(200).send(todos))
      .catch(error => res.status(400).send(error));
  },

  getUserTodoItems(req, res) {
    const id = req.decoded._id;
    // console.log(id, 'ooo');
    if (req.params.userId !== id) {
      return res.status(400).send({ message: 'Unauthorized access'});
    }
    return Todo.find({ owner: id})
      .then(todo => res.status(200).send(todo))
      .catch(error => res.status(400).send(errorMessage));
  },

  // getAllTodoItems(req, res) {
  //   console.log('I am here');
  //   User.findById(req.decoded._id).then((user) => {
  //     if (user) {
  //       console.log(user._id, '------->');
  //       return Todo.find({}).where('owner', user._id)
  //       .then(todos => res.status(200).send(todos))
  //       .catch(error => res.status(400).send(error));
  //     }
  //   })
   
  // },
  updateTodoItem(req, res) {
    Todo.findById(req.params.todo_id)
      .then((todo) => {
        if(!todo) {
          return res.status(400).json({
            message: 'Todo not found'
          })
        };
        todo.title = req.body.title;
        todo.save().then((todo) => res.status(200).send(todo))
        .catch(error => res.status(400).send(error));
      }).catch(error => res.status(400).send({ message: 'Todo with ID not found'}));
  },
  deleteTodoItem(req, res) {
    Todo.findById(req.params.todo_id)
      .then((todo) => {
        Task.remove({ todoItem: todo._id })
          .then((task) => {
            winston.info("Task removed");
          })
          .catch(error => res.status(400).send({ message: 'No Tasks associated with Todo' }));

        todo.remove({_id: req.params.todo_id})
          .then((todo) => {
            res.status(201).send({message: "Todo Deleted"})
          })
      })
      .catch(error => res.status(400).send({ message: 'Todo not found' }));
  },

  createTodoTask(req, res) {
    // const id = mongoose.Types.ObjectId(req.params.todo_id);
    const todoId = req.params.todo_id;
    console.log('I got here', todoId);


    Todo.findById(todoId.toString())
    .then(todo => {
      if(!todo) {
        return res.status(400).json({
          message: 'Todo not found'
        })
      }; 
      return new Task({
        content: req.body.content,
        complete: false,
        priorityLevel: 'normal',
        todoItem: req.params.todo_id,
        owner: req.decoded._id
      }).save()
      .then(task => {
        console.log(task, 'check this');
        return res.status(201).send(task);
      })
      .catch(error => res.status(500).send({ message: 'Server error', error }));
    })
    .catch(error => res.status(500).send({ message: 'Server error', error }));
  },

  getAllTodoTasks(req, res) {
    return Todo.findById(req.params.todo_id)
      .then(todo => {
        return Task.find({todoItem: todo.id}).sort({createdAt: -1})
        .then((tasks) => {
          res.status(200).send(tasks);
        })
        .catch(error => res.status(400).send(errorMessage));
      })
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
        if(!task) {
          return res.status(404).json({
            message: 'Task not found'
          })
        };
        console.log(req.body.complete);
        task.content = req.body.content || task.content;
        task.priorityLevel = req.body.priorityLevel || task.priorityLevel;
        task.complete = req.body.complete;
        task.updatedAt = Date.now();
        task.save().then((task) => res.status(200).send(task))
        .catch(error => res.status(400).send(errorMessage));
      })
      .catch(error => res.status(400).send({ message: 'Task with ID not found' }));
  },
  deleteTodoTask(req, res) {
    //let id = req.params._id;
    Task.remove({_id: req.params.task_id})
      .then(task => res.status(201).send({ message: "Task Deleted" }))
      .catch(error => res.status(400).send({ message: 'Task does not exist' }));
  },
};
