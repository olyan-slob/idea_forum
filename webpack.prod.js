// This file tells webpack to bundle all files that /source/app.js imports and spit out the result in /build/app.js
// Learn more here: https://webpack.js.org/guides/getting-started/

let path = require('path')
let webpack = require('webpack')
let CleanWebpackPlugin = require('clean-webpack-plugin')
let HtmlWebpackPlugin = require('html-webpack-plugin')

let algoliaConfig = require('./config/algolia-config.json')
let firebaseClientConfig = require('./config/firebase-config-prod.json')

module.exports = {
  entry: './source/app.js',
  output: {
    filename: 'app-[hash].js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
  },
  plugins: [
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true),
      ALGOLIA: JSON.stringify(algoliaConfig),
      FIREBASE: JSON.stringify(firebaseClientConfig),
    }),
    new CleanWebpackPlugin(['build']),
    new HtmlWebpackPlugin({
      template: './source/index.html',
      hash: true,
    }),
    new webpack.optimize.UglifyJsPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
}