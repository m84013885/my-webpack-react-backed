const path = require('path')
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
}))
// 服务器路由配置
app.get('/web/*', function (req, res, next) {
  const pagename = 'index.html'
  const filepath = path.join(compiler.outputPath, pagename)
  // 使用webpack提供的outputFileSystem
  compiler.outputFileSystem.readFile(filepath, function (err, result) {
    if (err) { return next('没有找到相关的路径') }
    // 发送获取到的页面
    res.set('content-type', 'text/html')
    res.send(result)
    res.end()
  })
})
app.use(WebpackHotMiddleware(compiler))
// Serve the files on port 3000.
app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n')
  childProcess.exec(`open http://${IP}:3000/`)
})
