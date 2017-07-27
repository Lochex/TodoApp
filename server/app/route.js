const express = require('express');

const TodoController = require('./controllers/todo');


module.exports.initRoutes = (router) => {
  router.get('/', (req, res) => {
    console.log("I'm working");
    res.json({message: 'I worked!'});
  });
  // TodoItem
  router.post('/todoitem', TodoController.createTodoItem);
  router.get('/todoitem/:todo_id', TodoController.getTodoItem);
  router.get('/todoitems', TodoController.getAllTodoItems);
  router.put('/todoitem/:todo_id', TodoController.updateTodoItem);
  router.delete('/todoitem/:todo_id', TodoController.deleteTodoItem);

  // TodoTasks
  router.post('/todoitem/:todo_id/todotask', TodoController.createTodoTask);
  router.get('/todoitem/:todo_id/todotasks', TodoController.getAllTodoTasks);
  router.get('/todotask/:task_id', TodoController.getTodoTask);
  router.put('/todotask/:task_id', TodoController.updateTodoTask);
  router.delete('/todotask/:task:id', TodoController.deleteTodoTask);

  return router;
}