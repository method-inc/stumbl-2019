'use strict'

const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devServer: {
    hot: true,
    watchOptions: {
      poll: true
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),

    // Hot Module Reloading (1/2)
    new HtmlWebpackPlugin({
      file: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // Hot Module Reloading (2/2)
    new webpack.HotModuleReplacementPlugin(),
  ]
}