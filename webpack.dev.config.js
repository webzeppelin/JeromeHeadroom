var webpack = require("webpack");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
module.exports = require('./webpack.config.js');    // inherit from the main config file

// disable the hot reload
module.exports.entry = [
  'babel-polyfill',
  path.resolve(__dirname, 'src/index.js'),
];

// export css to a separate file
module.exports.module.rules[1] = {
  test: /\.scss$/,
  loader: ExtractTextPlugin.extract('css-loader!sass-loader')
};
module.exports.plugins.push(
  new ExtractTextPlugin('../css/main.css')
);
