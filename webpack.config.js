const path = require('path')
const HTMLWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: "development",
  entry: {
    main: './src/main.js',
    click: './src/logger.js'
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    library: 'lib',
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: "App",
      template: './src/index.html'
    }),
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }, {
        test: /\.png/,
        type: 'asset/resource'
      },
      {
        test: /\.ttf/,
        type: 'asset/resource'
      }
    ]
  }
}