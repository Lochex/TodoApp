
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./app/route');
const config = require('../config');

const port = process.env.PORT || 8080;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const router = routes.initRoutes(express.Router());

mongoose.connect(config.mongodb);
app.use('/api/v1', router);

app.listen(port, () => {
    console.log('listening on 8080')
});
