const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const cwd = process.cwd()

module.exports = {
  mode:
    process.env.CURRENT_ENV === 'development' ? 'development' : 'production',
  entry: {
    app:
      process.env.CURRENT_ENV === 'development'
        ? [
            'babel-polyfill',
            'webpack-hot-middleware/client?noInfo=true&reload=true',
            './src/index.js'
          ]
        : ['babel-polyfill', './src/index.js']
  },
  output: {
    path: path.join(cwd, 'public'),
    filename:
      process.env.CURRENT_ENV === 'development'
        ? 'scripts/app.js'
        : 'scripts/[name].[hash].js'
  },
  resolve: {
    extensions: ['.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env', 'react', 'stage-2'],
              plugins: [require('babel-plugin-transform-object-rest-spread')]
            }
          }
          // {
          //   loader: 'eslint-loader',
          //   options: {
          //     fix: true
          //   }
          // }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'img/[name].[hash:16].[ext]',
          publicPath: '/'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '组织结构管理',
      inject: false,
      template: 'index.template.html'
    }),
    new webpack.ProvidePlugin({
      fetch: 'exports-loader?self.fetch!whatwg-fetch'
    })
  ],
  devtool:
    process.env.CURRENT_ENV === 'development'
      ? 'cheap-module-source-map'
      : ''
}
