require('dotenv').config({ silent: true });

const merge = require('webpack-merge');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const urlJoin = require('url-join');
const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
  build: path.join(process.cwd(), 'build')
};

const common = {
  entry: {
    index: 'src/index.js'
  },
  output: {
    publicPath: urlJoin(process.env.CDN_URL, '/')
  },
  plugins: [
    // Never move definePlugin from this array position,
    // some applications may wish to override these.
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        SERVICE_URL: JSON.stringify(process.env.SERVICE_URL)
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.(jpg|png)$/,
        loader: 'url-loader?limit=10000'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      },
      {
        test:   /\.css$/,
        loader: 'style-loader!css-loader?modules&localIdentName=[path]__[local]___[hash:base64:5]!postcss-loader'
      }
    ]
  },
  resolve: {
    root: [path.resolve('.')],
    modulesDirectories: ['node_modules']
  }
};

if (TARGET === 'build') {
  const config = merge.smart(common, {
    output: {
      path: PATHS.build,
      filename: '[name].[chunkhash].js'
    },
    module: {
      loaders: [
        {
          test:   /\.css$/,
          loader: ExtractTextPlugin.extract('css-loader?modules!postcss-loader')
        }
      ]
    },
    plugins: [
      new ManifestPlugin({ filename: 'manifest.json' }),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new ExtractTextPlugin('[name].[chunkhash].css')
    ]
  });

  if (process.env.NODE_ENV === 'production') {
    config.plugins = config.plugins.concat([
      new webpack.optimize.UglifyJsPlugin({ comments: false }),
      new webpack.optimize.DedupePlugin()
    ]);
  }

  module.exports = config;
}
else {
  module.exports = merge(common, {});
}