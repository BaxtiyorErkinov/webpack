const path = require('path')
const HTMLWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetWebpackPlugin = require("optimize-css-assets-webpack-plugin")
const TerserWebpackPlugin = require("terser-webpack-plugin")

const isDev = process.env.NODE_ENV === "development"
const isProd = !isDev

const optimization = () => {
  const conf = {
    splitChunks: {
      chunks: 'all'
    }
  }
  if (isProd) {
    conf.minimizer = [
      new OptimizeCssAssetWebpackPlugin(),
      new TerserWebpackPlugin()
    ]
  }

  return conf
}

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
      template: './src/index.html',
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    })
  ],
  optimization: optimization(),
  devServer: {
    port: 7777,
    hot: isDev,
    client: {
      progress: true,
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader']
      }, {
        test: /\.png/,
        type: 'asset/resource'
      },
      {
        test: /\.ttf/,
        type: 'asset/resource'
      },
      {
        test: /\.xml$/,
        type: 'asset/resource'
      },
      {
        test: /\.csv$/,
        type: 'asset/resource'
      }
    ]
  }
}