const mongoose = require('mongoose');
const jwt =  require('jsonwebtoken');
const dotenv = require('dotenv').config();
const User = require('../models/User');
const validator = require('../utilities/validator');
const encrypt = require('../utilities/encrypt').encrypt;
const dencrypt = require('../utilities/encrypt').dencrypt;
const config = require('../../../config/config');

global.Promise = mongoose.Promise;

const validateEmail = validator.validateEmail;
const validatePassword = validator.validatePassword;
const validatorName = validator.validatorName;
const errorMessage = { message: "Error occured" };

module.exports = {
  createUser(req, res) {
    // create user object
    const userData = req.body;
    if (validatorName(userData.name) && validateEmail(userData.email)
       && validatePassword(userData.password)) {
      const userObject = {
        name: userData.name,
        email: userData.email,
        password: encrypt(userData.password),
        //provider: userData.provider || 'basic',
        status: 'active'
      }
      return new User(userObject)
        .save()
        .then(newUser => {
          // create JWt
          const JWTPayload = {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email
          }
          const token = jwt.sign(JWTPayload, process.env.SECRET, {
          expiresIn: 60*60*24
          });

          // create response payload
          const response = {
            user: JWTPayload,
            jwt: token
          };
          res.status(201).send({ message: 'User created'});
        })
        .catch(error => {
          res.status(400).send(error)
        });
    } else {
      res.status(400).send({ message: 'Name, email and passsword are compulsory'});
    }
    
  },
  login(req, res) {
    const userData = req.body;
    if (validateEmail(userData.email) && validatePassword(userData.password)) {
      return User.findOne({ email: userData.email })
      .then(foundUser => {
        // when user does not exist
        if(!foundUser) {
          return res.status(401).json({
            message: 'Wrong email or password'
          });
        }
        // check user's passwor
        const isPassowrd = dencrypt(userData.password, foundUser.password);
        if(!isPassowrd) {
          return res.status(401).json({
            message: 'Wrong password'
          });
        }
        // create JWt
        const JWTPayload = {
          _id: foundUser._id,
          name: foundUser.name,
          email: foundUser.email
        }
        const token = jwt.sign(JWTPayload, process.env.SECRET);
        // create response payload
        const response = {
          user: JWTPayload,
          jwt: token
        };
        res.status(200).send(response)
      }).catch(error => res.status(400).send(error));
    } else {
      res.status(400).send({ message: 'Invalid Email or password'});
    }
  }
};