var webpack = require('webpack');

module.exports = {
  entry: [
    './app/index.js' // Your appʼs entry point
  ],
  output: {
    path: './public',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: ['babel'],
        query: {
          presets: ['react', 'es2015'],
          plugins: ['transform-object-rest-spread']
        }
      }
    ]
  }
}
