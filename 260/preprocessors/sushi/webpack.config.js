const path = require('path');
const HandlebarsPrecompiler = require('webpack-handlebars-precompiler');
const webpack = require('webpack');
module.exports = {
  context: __dirname,
  entry: {
    app: './app.js',
    vendor: ['underscore', 'jquery', 'backbone', 'handlebars'],
  },
  output: {
    path: path.resolve(__dirname, 'public/javascripts/vendor'),
    filename: '[name].js',
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor'),
    new HandlebarsPrecompiler({
            precompileOpts: {preventIndent: true},
            templatesPath: path.join(__dirname, 'handlebars'),
            templatesExt: '.hbs',
            outputFile: path.join(__dirname, 'public/javascripts/vendor/handlebar_templates.js')
    })
  ],
  node: {
    fs: 'empty', // weird bug workaround apparently
    net: 'empty'
  }
};
