const path = require('path');
const webpack = require('webpack');
module.exports = {
  context: __dirname,
  entry: {
    app: './app.js',
    vendor: ['underscore', 'jquery', 'backbone']
  },
  output: {
    path: path.resolve(__dirname, 'public/vendor'),
    filename: '[name].bundle.js',
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor')
  ],
  node: {
    fs: 'empty', // weird bug workaround apparently
    net: 'empty'
  }
};
