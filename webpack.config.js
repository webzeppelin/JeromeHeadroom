// http://webpack.github.io/docs/configuration.html
// http://webpack.github.io/docs/webpack-dev-server.html
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: [
    // http://gaearon.github.io/react-hot-loader/getstarted/
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    'babel-polyfill',
    './index.js'
  ],
  output: {
    path: path.resolve(__dirname, './public/js'),
    publicPath: 'js/',
    filename: 'jerome-headroom.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loaders: ['react-hot-loader', 'babel-loader'],
        exclude: /node_modules/,
      },
      {
        // https://github.com/jtangelder/sass-loader
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      }
    ],
  },
  devServer: {
    contentBase: __dirname + '/public',
  },
  plugins: [
    new CleanWebpackPlugin(['css/main.css', 'js/jerome-headroom.bundle.js'], {
      root: path.resolve(__dirname, '/public'),
      verbose: true,
      dry: false, // true for simulation
    }),
  ],
};
