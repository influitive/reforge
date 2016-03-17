require('dotenv').config({ silent: true });

const merge = require('webpack-merge');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const TARGET = process.env.TARGET;
const PATHS = {
  build: path.join(process.cwd(), 'build')
};

const common = {
  output: {
    publicPath: process.env.CDN
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
      }
    })
  ],
  module: {
    loaders: [
      {
        test:   /\.css$/,
        loader: 'style-loader!css-loader?modules!postcss-loader'
      }
    ]
  },
  resolve: {
    root: [path.resolve('.')],
    modulesDirectories: ['node_modules', 'node_modules/reforge/node_modules']
  },
  postcss: require('./postcss.config.js')
};

if (TARGET === 'start') {
  module.exports = merge(common, {});
}

if (TARGET === 'build') {
  module.exports = merge.smart(common, {
    entry: {
      main: 'main.js',
      vendor: [
        'react',
        'react-dom',
        'redux',
        'redux-saga',
        'react-redux',
        'react-router',
        'react-router-redux'
      ]
    },
    output: {
      path: PATHS.build,
      filename: '[name].[chunkhash].js',
      publicPath: process.env.CDN
    },
    resolve: {
      alias: {
        'react': 'react-lite',
        'react-dom': 'react-lite'
      }
    },
    module: {
      loaders: [
        {
          test:   /\.css$/,
          // Extract text needs text not a javascript module, so leave off style-loader
          loader: ExtractTextPlugin.extract('css-loader?modules!postcss-loader')
        }
      ]
    },
    plugins: [
      //new webpack.IgnorePlugin(/babel-polyfill/),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: Infinity
      }),
      new ManifestPlugin({ filename: 'manifest.json' }),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({sourceMap: false, compress: {warnings: false}}),
      new ExtractTextPlugin('[name].[chunkhash].css')
    ]
  });
}
