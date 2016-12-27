var path = require('path');
var fs = require('fs');
const NpmInstallPlugin = require('npm-install-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('./package').config;

module.exports = {
  entry: './src/client.js',
  output: {
    path : 'public',
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel']
      },
      {
        test: /\.css$/i,
        loader: ExtractTextPlugin.extract('style',
          `css?modules&localIdentName=${config.css}!postcss`),
      },
    ]
  },
  postcss: [
    // small sugar for CSS
    require('postcss-font-magician'),
    require('autoprefixer'),
  ],
  plugins: [
    new ExtractTextPlugin('common.css', {
      allChunks: true
    }),
    new NpmInstallPlugin({
      cacheMin: 999999,
      saveDev: true,
      saveExact: true,
    }),
  ]
};