const express = require('express');
const path = require('path');
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const mongoose = require('mongoose');
const routes = require('./app/route');
const config = require('../config/config');
const dotenv = require('dotenv');
dotenv.config();

// Initialise routes
const router = express.Router();
const compiler = webpack(webpackConfig);
const port = 3000;
const env = process.env.NODE_ENV || 'development';
const connectedEnv = config[process.env.NODE_ENV] || config['development'];
const staticDir = path.join(__dirname, '../public');

// Configure middleware
// app.use(logger('dev'));


// Mongoose connect
mongoose.connect(connectedEnv, { useMongoClient: true });

if (env === 'development') {
  app.use(webpackMiddleware(compiler, {
    stats: {
      colors: true
    },
    publicPath: webpackConfig.output.publicPath
  }));
} else {
  app.use(express.static(staticDir));
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(router);
app.use('/api/v1', router);
app.get('*', (req, res) => {
  res.sendFile(path.join(staticDir, 'index.html'));
  // console.log("I'm working");
  // res.json({message: 'I worked!'});
});

app.listen(port, () => {
    console.log('listening on port', port);
});

module.exports = app;