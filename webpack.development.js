const webpack = require('webpack');
const { resolve, join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  context: resolve(__dirname, 'src'),
  entry: {
    app: [
      './index.html',
      './css/index.css',
    ],
  },
  devServer: {
    host: '0.0.0.0',
    hot: true,
    noInfo: false,
    quiet: false,
  },
  optimization: {
    namedModules: true,
    noEmitOnErrors: true
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
        test: /\.(jpe?g|png|gif|ico)$/i,
        loader: "file-loader?name=[name].[ext]"
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
  ]
}