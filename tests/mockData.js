//const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const faker = require('faker');
dotenv.config();

module.exports = {
  fakeBaasbank: {
    email: 'pario@gmail.com',
    password: process.env.BAAS
  },

  mockCreateUser: {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: 'itua789#'
  },

  invalidUser: {
    name: 'Elo Abass',
    email: 'elobass.com',
    password: '222333$'
  },

  invalidLogin: {
    name: 'Elo Abass',
    email: 'elobass.com',
  },

  mockInvalidPassword: {
    email: 'pario@gmail.com',
    password: 'pari456#'
  },

  mockInvalidEmail: {
    email: 'parios@gmail.com',
    password: 'pari789#'
  }

}
//module.exports = mockData;