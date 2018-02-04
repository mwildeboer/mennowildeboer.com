const webpack = require('webpack');
const { resolve, join } = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: resolve(__dirname, 'src'),
  entry: {
    app: [
      'webpack-dev-server/client?http://localhost:8080',
      './index.html',
      './css/index.css',
    ],
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: resolve(__dirname, 'public'),
    publicPath: "/"
  },
  devServer: {
    hot: true,
    noInfo: false,
    quiet: false
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: [
              'img:src',
              'link:href'
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader'
        ],
        exclude: '/node_modules/'
      },
      {
        test: /\.(jpe?g|png|gif|ico)$/i, loader: "file-loader?name=[name].[ext]"
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}