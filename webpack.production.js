const webpack = require('webpack');
const { resolve, join } = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'production',
  context: resolve(__dirname, 'src'),
  entry: {
    app: [
      './index.html',
      './css/index.css',
    ],
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: resolve(__dirname, 'public'),
    publicPath: "/"
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
            ],
            minimize: true
          },
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader'
        ],
        exclude: '/node_modules/'
      },
      {
        test: /\.(jpe?g|png|gif|ico)$/i,
        loader: "file-loader?name=images/[name].[hash:7].[ext]",
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin([ "public" ], { verbose: false }),
    new HtmlWebpackPlugin({
      template: 'index.html',
      excludeAssets: [/app.*.js/]
    }),
    new HtmlWebpackExcludeAssetsPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[id].[hash].css"
    }),
    new CompressionPlugin()

  ]
}