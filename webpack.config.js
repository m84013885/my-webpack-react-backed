const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const { routers } = require('./config.json')

const webpackConfig ={
    performance: { maxEntrypointSize: 400000 },
    entry: {
        // app: ["./src/index.js"]
    },
    devtool: 'false',
    output: {
        filename: './js/[name].[chunkhash:5].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: ''
    },
    module: {
        rules: [
            {
                test: /\.(m?js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader:'babel-loader'
                }
            },
            {
                test: /\.css$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    miniCssExtractPlugin.loader,
                    'css-loader?modules&localIdentName=_[local]_[hash:base64:5]',
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            config: { path: path.resolve(__dirname, 'dev/postcss.config.js') }
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    'file-loader?limit=1&name=[name].[ext]&outputPath=/images&publicPath=../images'
                ]
            }
        ]
    },
    // 4.0 之后分代码
    optimization: {
        runtimeChunk: { name: () => { return 'manifest' } },
        splitChunks: {
            chunks: 'initial',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 2,
            maxInitialRequests: 2,
            automaticNameDelimiter: '-',
            name: true,
            name: 'react',
            cacheGroups: {
              vendors: {
                test: /\/node_modules\//,
                priority: -10,
              },
              'react-vendor': {
                test: (module) => /react/.test(module.context),
                priority: 1,
              },
              default: {
                minChunks: 2,
                priority: -20,
                reuseExistingChunk: true,
              }
            }
          },
          minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true,
                uglifyOptions: {
                    compress: { drop_console: true },
                    output: { comments: false }
                }
            }),
            new OptimizeCSSAssetsPlugin({})
            ]
    },
    // externals: ["react", "react-dom","mobx","mobx-react"], // string（精确匹配）
    plugins: [
        new CleanWebpackPlugin(['dist']),
        // new HtmlWebpackPlugin({
        //     template: path.resolve(__dirname, './index.html')
        // }),
        new webpack.ProvidePlugin({
            React: 'react',
            ReactDom: 'react-dom',
            PropTypes: 'prop-types'
        }),
        new miniCssExtractPlugin({
            chunkFilename: "./css/[name].[chunkhash:5].css"
        })
    ],
    mode: 'production' // 设置mode
}
routers.map((item) => {
    const {
        template
    } = item
    // 每个页面使用一个entry配置
    const routerScript = [path.resolve(__dirname, `./src/router/${template}/index.js`)]
    const plugin = new HtmlWebpackPlugin({
        filename: `${template}.html`,
        template: path.resolve(__dirname, `./src/router/${template}/index.html`),
        chunks: ['manifest','react',template]
    })
    webpackConfig.entry[template] = routerScript
    webpackConfig.plugins.push(plugin)
})
module.exports = webpackConfig