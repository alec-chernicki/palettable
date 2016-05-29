const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
  entry: [
    './static/index.js',
  ],
  output: {
    path: './public',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: ['babel'],
        query: {
          presets: ['react', 'es2015'],
          plugins: ['transform-object-rest-spread'],
        },
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css!sass!postcss-loader!'),
      },
      {
        test: /\.svg$/,
        loader: 'file',
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('style.css', {
      allChunks: true,
    }),
  ],
  postcss: () => [autoprefixer],
};
