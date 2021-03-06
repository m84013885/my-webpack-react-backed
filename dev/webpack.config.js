const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const { routers } = require('../config.json')
const webpackConfig = {
  entry: {
    // index:[`./src/router/index/index.js`,`webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000`]
  },
  devtool: 'inline-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new HtmlWebpackPlugin({
    //     template: path.resolve(__dirname, '../src/router/index/index.html')
    // }),
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDom: 'react-dom',
      PropTypes: 'prop-types'
    })
  ],
  output: {
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(m?js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          'style-loader',
          'css-loader?modules&localIdentName=_[local]_[hash:base64:5]',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              config: { path: path.resolve(__dirname, 'postcss.config.js') }
            }
          }
        ]
      },
      {
        test: /\.css$/,
        include: /(antd)/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              config: { path: path.resolve(__dirname, 'postcss.config.js') }
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  mode: 'development' // 设置mode
}

routers.map((item, index) => {
  const {
    name,
    template
  } = item
  const tempSrc = path.resolve(__dirname, `../src/router/${template}/index.html`)
  const plugin = new HtmlWebpackPlugin({
    filename: `${template}.html`,
    title: name,
    template: tempSrc,
    inject: true,
    chunks: [template]
  })
  webpackConfig.entry[template] = [`./src/router/${template}/index.js`, `webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000`]
  webpackConfig.plugins.push(plugin)
})
module.exports = webpackConfig
