// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const data = require('../tests/mockData');
const mongoose = require('mongoose');
const Todo = require('../app/models/User');

// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();

const {
  mockCreateUser,
  invalidUser,
  fakeBaasbank,
  invalidLogin,
  mockInvalidPassword,
  mockInvalidEmail
} = data;

chai.use(chaiHttp);

describe('Users', () => {
  // beforeEach((done) => {
  //   chai.request(server)
  //     .post('/api/v1/user/login')
  //     .set('Content-Type', 'application/json')
  //     .send(fakeBaasbank)
  //     .end((err, res) => {
  //       if (err) {
  //         console.log('this is error', err);
  //       }
  //       mockToken = res.body.jwt;
  //       done();
  //   });
  // });

  /*
  * Test the /POST create user route
  */
  describe('/POST User', () => {
    it('should CREATE a new user', (done) => {
      chai.request(server)
          .post('/api/v1/user')
          .send(mockCreateUser)
          .end((err, res) => {
            res.should.have.status(201);
            done();
          });
    });
  });

  describe('/POST User', () => {
    it('should return an error message when an invalid user detail is entered', (done) => {
      chai.request(server)
          .post('/api/v1/user')
          .send(invalidUser)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property('message').eql('Enter details with the right format');
            done();
          });
    });
  });

  /*
  * Test the /POST login user route
  */
  describe('/POST User', () => {
    it('should authenticate the user and login', (done) => {
      chai.request(server)
          .post('/api/v1/user/login')
          .send(fakeBaasbank)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
    });

    it('should return an error message when an invalid user detail is entered', (done) => {
      chai.request(server)
          .post('/api/v1/user/login')
          .send(invalidLogin)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property('message').eql('Invalid Email or password');
            done();
          });
    });

    it('should return an error message', (done) => {
      chai.request(server)
          .post('/api/v1/user/login')
          .send(mockInvalidPassword)
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.have.property('message').eql('Invalid password');
            done();
          });
    });

    it('should return an error message', (done) => {
      chai.request(server)
          .post('/api/v1/user/login')
          .send(mockInvalidEmail)
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.have.property('message').eql('Invalid email address');
            done();
          });
    });
  });
});
