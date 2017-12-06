'use strict'

// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const DashboardPlugin = require('webpack-dashboard/plugin')
const webpackConfig = require('./webpack.config.js')

const devtool = 'source-map'

const entry = {
  vendor: './src/vendor.js',
  main: ['babel-polyfill', './src/main.js']
}

const output = {
  filename: '[name].js',
  path: path.resolve(__dirname) + '/../src/main/resources/static/'
  // path: '../src/main/resources/static/'
}

const extensions = [
  '.js',
  '.css',
  '.html'
]

const modules = [
  'node_modules',
  'src'
]

const rules = [{
  test: /.js$/,
  exclude: /node_modules/,
  use: ['babel-loader']
}, {
  test: /.css$/,
  use: [
    'style-loader',
    'css-loader'
  ]
}, {
  test: /.html$/,
  include: /src/,
  exclude: /node_modules/,
  use: ['ngtemplate-loader', 'html-loader']
}, {
  test: /.html$/,
  include: /static/,
  exclude: /node_modules/,
  use: 'html-loader'
}, {
  test: /.(ico|png|eot|svg|ttf|woff|woff2)$/,
  use: 'url-loader?limit=10000'
}]

const plugins = [
  // new ExtractTextPlugin('[name].css'),
  new HtmlWebpackPlugin({
    hash: true,
    template: './static/index.html',
    inject: 'head'
  }),

  // new DashboardPlugin(),

  new webpack.ProvidePlugin({
    ng: 'angular',
    md: 'angular-material'
  })
]

const devServer = {
  compress: true,
  inline: true,
  // render a fullscreen overlay on the client when the dev server
  // encounters an error.
  overlay: true,
  // allows for SPA routing without a path  prefix
  historyApiFallback: true
}

module.exports = {
  devtool,
  entry,
  output,
  resolve: {
    extensions,
    modules
  },
  module: {
    rules
  },
  plugins,
  devServer
}
