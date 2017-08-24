//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const data = require('./mockData');
const mongoose = require("mongoose");
const Todo = require('../server/app/models/TodoItem');
const Task = require('../server/app/models/TodoTasks');

// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server/app');
const should = chai.should();

const { fakeBaasbank } = data;

let mockToken, dummyId, dummyTitle, mockTaskId;
const errorMessage = { message: "Error occured" };

chai.use(chaiHttp);
//Our parent block
describe('Todos', () => {
  beforeEach((done) => {
    chai.request(server)
      .post('/api/v1/user/login')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send(fakeBaasbank)
      .end((err, res) => {
        if (err) {
          console.log('this is error');
        }
        mockToken = res.body.jwt;
        done();
    });
  });

  beforeEach((done) => { //Before each test we create a todo
      let todo = { title: 'Create party plans with Bassbank' };
      chai.request(server)
            .post('/api/v1/todoitem')
            .set({ 'x-access-token': mockToken })
            .send(todo)
            .end((err, res) => {
              dummyId = res.body._id;
              dummyTitle = res.body.title;
              done();
            });
  });
  beforeEach((done) => { //Before each test we create a task
    let task = {
          content: "Create Software for Admin Dept",
          complete: false,
          priorityLevel: 'normal'
      }
      chai.request(server)
        .post(`/api/v1/todoitem/${dummyId}/todotask`)
        .set({ 'x-access-token': mockToken })
        .send(task)
        .end((err, res) => {
          mockTaskId = res.body._id;
          done();
        });
  });
  afterEach((done) => { //Before each test we empty the database  
    Todo.remove({}, (err) => { 
          done();         
      });     
  });

  /*
  * Test the /GET route
  */
  describe('/GET Todo', () => {
      it('should GET all the Todos', (done) => {
        chai.request(server)
            .get('/api/v1/todoitems')
            .set({ 'x-access-token': mockToken })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              res.body.length.should.be.eql(1);
              done();
            });
      });
      it('should return an error message', (done) => {
        chai.request(server)
            .get('/api/v1/todoitems')
            .set({ 'x-access-token': 7327543782754589542 })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.property('message').eql('Failed to authenticate token.');
              res.body.should.be.a('object');
              done();
            });
      });
  });
  /*
  * Test the /POST route
  */
  describe('/POST todo', () => {
      it('it should not POST a todo without the title field', (done) => {
        let todo = {
            
        }
        chai.request(server)
            .post('/api/v1/todoitem')
            .set({ 'x-access-token': mockToken })
            .send(todo)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Title field is required');
              done();
            });
      });
      it('it should POST a todo ', (done) => {
        let todo = {
            title: "Create Software for Admin Dept"
        }
        chai.request(server)
            .post('/api/v1/todoitem')
            .set({ 'x-access-token': mockToken })
            .send(todo)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('title');
                res.body.should.have.property('owner');
                res.body.should.have.property('createdAt');
                res.body.should.have.property('updatedAt');
              done();
            });
      });
  });
  describe('/GET/:todo_id todo', () => {
      it('it should GET a todo by the given id', (done) => {
          chai.request(server)
            .get(`/api/v1/todoitem/${dummyId}`)
            .set({ 'x-access-token': mockToken })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('title');
              res.body.should.have.property('owner');
              res.body.should.have.property('createdAt');
              res.body.should.have.property('updatedAt');
              res.body.should.have.property('_id').eql(dummyId);
              done();
            });

      });
      it('it should return an error message when given a wrong id', (done) => {
          chai.request(server)
            .get(`/api/v1/todoitem/976437fg`)
            .set({ 'x-access-token': mockToken })
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.have.property('message').eql('Error occured');
              res.body.should.be.a('object');
              done();
            });

      });
  });

  describe('/PUT/:todo_id todo', () => {
      it('it should UPDATE a todo given the id of the todo', (done) => {
          chai.request(server)
            .put(`/api/v1/todoitem/${dummyId}`)
            .set({ 'x-access-token': mockToken })
            .send({ title: 'Updated Title content'})
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              done();
            });

      });
      it('it should return an error message when given a wrong id', (done) => {
          chai.request(server)
            .put(`/api/v1/todoitem/976437fg`)
            .set({ 'x-access-token': mockToken })
            .send({ title: 'Updated Title content'})
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.have.property('message').eql('Todo with ID not found');
              res.body.should.be.a('object');
              done();
            });

      });
      it('it should return an error message when given a wrong id', (done) => {
          chai.request(server)
            .put(`/api/v1/todoitem/597de9ea6516947c610af922`)
            .set({ 'x-access-token': mockToken })
            .send({ title: 'Updated Title content'})
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.have.property('message').eql('Todo not found');
              res.body.should.be.a('object');
              done();
            });

      });
  });
  /*
  * Test the /POST route Task
  */
  describe('/POST task', () => {
      it('it should POST a todo task ', (done) => {
        let task = {
            content: "Create Software for Admin Dept",
            complete: false,
            priorityLevel: 'urgent'
        }
        chai.request(server)
            .post(`/api/v1/todoitem/${dummyId}/todotask`)
            .set({ 'x-access-token': mockToken })
            .send(task)
            .end((err, res) => {
              res.should.have.status(201);
              res.body.should.be.a('object');
              res.body.should.have.property('content');
              res.body.should.have.property('complete');
              res.body.should.have.property('priorityLevel');
              res.body.should.have.property('todoItem');
              done();
            });
      });
      it('it should return an error when no task has been entered', (done) => {
        let task = {
            content: "",
            complete: false,
            priorityLevel: 'URGENT'
        }
        chai.request(server)
            .post(`/api/v1/todoitem/${dummyId}/todotask`)
            .set({ 'x-access-token': mockToken })
            .send(task)
            .end((err, res) => {
              res.should.have.status(500);
              res.body.should.have.property('message').eql('Server error');
              res.body.should.be.a('object');
              done();
            });
      });
      it('it should return an error when given a wrong todo id', (done) => {
        let task = {
            content: "Create Software for Admin Dept",
            complete: false,
            priorityLevel: 'URGENT'
        }
        chai.request(server)
            .post('/api/v1/todoitem/8934828/todotask')
            .set({ 'x-access-token': mockToken })
            .send(task)
            .end((err, res) => {
              res.should.have.status(500);
              res.body.should.have.property('message').eql('Server error');
              res.body.should.be.a('object');
              done();
            });
      });
      it('it should return an error when given a wrong todo id', (done) => {
        let task = {
            content: "Create Software for Admin Dept",
            complete: false,
            priorityLevel: 'URGENT'
        }
        chai.request(server)
            .post('/api/v1/todoitem/597de9ea6516947c610af922/todotask')
            .set({ 'x-access-token': mockToken })
            .send(task)
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.have.property('message').eql('Todo not found');
              res.body.should.be.a('object');
              done();
            });
      });    
      
  });

  /*
  * Test the /GET route Task
  */
  describe('/GET all tasks', () => {
      it('it should GET all todo tasks ', (done) => {
        chai.request(server)
            .get(`/api/v1/todoitem/${dummyId}/todotasks`)
            .set({ 'x-access-token': mockToken })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              done();
            });
      });
      it('it should return an error when given a wrong todo id', (done) => {
        chai.request(server)
            .get('/api/v1/todoitem/8934828/todotasks')
            .set({ 'x-access-token': mockToken })
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.have.property('message').eql('Todo does not exist');
              res.body.should.be.a('object');
              done();
            });
      });  
      
  });
  describe('/DELETE/:todo_id todo', () => {
    it('it should DELETE a todo by the given id', (done) => {
        chai.request(server)
          .delete(`/api/v1/todoitem/${dummyId}`)
          .set({ 'x-access-token': mockToken })
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.have.property('message').eql('Todo Deleted');
            done();
          });
    });
    it('it should return an error message when given a wrong id', (done) => {
        chai.request(server)
          .delete(`/api/v1/todoitem/74349373yt`)
          .set({ 'x-access-token': mockToken })
          .end((err, res) => {
            res.should.have.status(400);
              res.body.should.have.property('message').eql('Todo not found');
              res.body.should.be.a('object');
              done();
          });
    });
  });

  /*
  * Test the /GET route Task
  */
  describe('/GET/:task_id task', () => {
      it('it should GET a task by the given id', (done) => {
          chai.request(server)
            .get(`/api/v1/todotask/${mockTaskId}`)
            .set({ 'x-access-token': mockToken })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('content');
              res.body.should.have.property('complete');
              res.body.should.have.property('priorityLevel');
              res.body.should.have.property('todoItem');
              res.body.should.have.property('_id').eql(mockTaskId);
              done();
            });

      });
      it('it should return an error message when given a wrong id', (done) => {
          chai.request(server)
            .get(`/api/v1/todotask/976437fg`)
            .set({ 'x-access-token': mockToken })
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.have.property('message').eql('Error occured');
              res.body.should.be.a('object');
              done();
            });

      });
  });

  /*
  * Test the /PUT route Task
  */
  describe('/PUT/:task_id todo', () => {
      it('it should UPDATE a task given the id of the task', (done) => {
          chai.request(server)
            .put(`/api/v1/todotask/${mockTaskId}`)
            .set({ 'x-access-token': mockToken })
            .send({ content: 'Updated Content of Task'})
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              done();
            });

      });
      it('it should return an error message when given a wrong id', (done) => {
          chai.request(server)
            .put(`/api/v1/todotask/976437fg`)
            .set({ 'x-access-token': mockToken })
            .send({ content: 'Updated Content of Task'})
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.have.property('message').eql('Task with ID not found');
              res.body.should.be.a('object');
              done();
            });

      });
      it('it should return an error message when given a wrong id', (done) => {
          chai.request(server)
            .put(`/api/v1/todotask/597de9ea6516947c610af922`)
            .set({ 'x-access-token': mockToken })
            .send({ title: 'Updated Content of Task'})
            .end((err, res) => {
              res.should.have.status(404);
              res.body.should.have.property('message').eql('Task not found');
              res.body.should.be.a('object');
              done();
            });

      });
  });

  /*
  * Test the /DELETE route Task
  */
  describe('/DELETE/:task_id task', () => {
    it('it should DELETE a task by the given id', (done) => {
        chai.request(server)
          .delete(`/api/v1/todotask/${mockTaskId}`)
          .set({ 'x-access-token': mockToken })
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.have.property('message').eql('Task Deleted');
            done();
          });
    });
    it('it should return an error message when given a wrong id', (done) => {
        chai.request(server)
          .delete(`/api/v1/todotask/74349373yt`)
          .set({ 'x-access-token': mockToken })
          .end((err, res) => {
            res.should.have.status(400);
              res.body.should.have.property('message').eql('Task does not exist');
              res.body.should.be.a('object');
              done();
          });
    });
  });

});