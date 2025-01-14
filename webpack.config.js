var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      exclude: /node_modules/
    }, {
      test: /\.css?$/,
      loaders: ['style', 'raw']
    }]
  },
  devServer: {
    publicPath: '/static/',
    hot: true,
    historyApiFallback: true,
    stats: {
        colors: true
    },
    port: 3000,
    proxy: {
      '/api/': {
          target: 'http://127.0.0.1:3001',
      },
      '/proxy/': {
          target: 'http://127.0.0.1:3001',
      },
    },
  }
};
