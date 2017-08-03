
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const webpack = require('webpack');
const  webpackConfig = require('../webpack.config');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const mongoose = require('mongoose');
const routes = require('./app/route');
const config = require('../config/config');
const dotenv = require('dotenv');
dotenv.config();

console.log('public path.........................', webpackConfig.output.publicPath,);
const compiler = webpack(webpackConfig);
//app.use(logger('dev'))
const port = process.env.PORT || 8080;
const env = process.env.NODE_ENV || 'development';
const connectedEnv = config[process.env.NODE_ENV] || config['development'];
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
console.log('This is connect', env);

const staticDir = path.join(__dirname, '../public');
app.use(express.static(staticDir));

if (env === 'development') {
  app.use(webpackMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    hot: true
  }));
  app.use(webpackHotMiddleware(compiler));
}


const router = routes.initRoutes(express.Router());

mongoose.connect(connectedEnv);
app.use('/api/v1', router);

app.listen(port, () => {
    console.log('listening on port', port);
});

app.use('/', (req, res) => {
  res.sendFile(path.join(staticDir, 'index.html'));
});

module.exports = app;