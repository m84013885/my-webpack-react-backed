const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const WebpackHotMiddleware = require('webpack-hot-middleware')
const childProcess = require('child_process')
const IP = require('./IP')
const app = express()
const proxy = require('http-proxy-middleware')
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
}))

// Add middleware for http proxying
const apiProxy = proxy(
  '/api',
  {
    target: 'http://remix-tj.moumentei.com/',
    changeOrigin: true,
    pathRewrite: {
      '^/api': ''
    }
  }
)
app.use('/api/*', apiProxy)// api子目录下的都是用代理

app.use(WebpackHotMiddleware(compiler))
// Serve the files on port 3000.
app.listen(3000, function () {
  childProcess.exec(`open http://${IP}:3000`)
})
