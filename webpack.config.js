var webpack = require('webpack');

module.exports = {
  entry: __dirname + '/src/index.js',
  output: {
    path: __dirname + '/dist',
    library: 'wikihub',
    filename: 'wikihub.min.js',
    publicPath: '/dist'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  },
  devServer: {
    contentBase: './example'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ]
};
