const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const WebpackHotMiddleware = require('webpack-hot-middleware')
const childProcess = require('child_process')
const IP = require('./IP')
const app = express()
const config = require('./webpack.config')
const compiler = webpack(config)

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: { colors: true, chunks: false },
  progress: true,
  inline: true,
  hot: true
}));
app.use(WebpackHotMiddleware(compiler))
// Serve the files on port 3000.
app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
  childProcess.exec(`open http://${IP}:3000/`)
});