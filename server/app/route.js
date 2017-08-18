const controllers = require('./controllers'); 
const auth = require('./middleware/auth');

const TodoController = controllers.Todo;
const UserController = controllers.User;


 const routes = (router) => {
  // User
  router.post('/user', UserController.createUser);

  router.post('/user/login', UserController.login);
  
  // Todo: add authentication middleware here 

  //router.put('/user', UserController.updateUser);
  //TodoItem
  router.get('/todoitem/:todo_id', auth.verifyToken, TodoController.getTodoItem);
  router.put('/todoitem/:todo_id', auth.verifyToken, TodoController.updateTodoItem);
  router.delete('/todoitem/:todo_id', auth.verifyToken, TodoController.deleteTodoItem);
  router.get('/todoitems/:userId', auth.verifyToken, TodoController.getUserTodoItems);
  router.get('/todoitems', auth.verifyToken, TodoController.getAllTodoItems);
  router.post('/todoitem', auth.verifyToken, TodoController.createTodoItem);
  

  // TodoTasks
  router.post('/todoitem/:todo_id/todotask', auth.verifyToken, TodoController.createTodoTask);
  router.get('/todoitem/:todo_id/todotasks', auth.verifyToken, TodoController.getAllTodoTasks);
  router.delete('/todotask/:task_id', auth.verifyToken, TodoController.deleteTodoTask);
  router.get('/todotask/:task_id', auth.verifyToken, TodoController.getTodoTask);
  router.put('/todotask/:task_id', auth.verifyToken, TodoController.updateTodoTask);
}

module.exports = routes;