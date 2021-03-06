const webpack = require('webpack');

module.exports = {
  entry: `${__dirname}/src/client/index.js`,
  output: {
    path: `${__dirname}/public/dist`,
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
        },
      }
    ],
  },
};