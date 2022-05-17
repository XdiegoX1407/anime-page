const webpack = require('webpack')
const path = require('path')

const nodeEnv = process.env.NODE_ENV || 'development'

const config = {
  mode: nodeEnv,
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: '[name].bundle.js',
  },
  devServer: {
    contentBase: '.',
  },
  optimization : {
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        test:/\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
}

module.exports = config
