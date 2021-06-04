const webpack = require('webpack');
const path = require('path');

const plugins = [];
plugins.push(new webpack.IgnorePlugin(/log4js/));

module.exports = {
  plugins,
  entry: path.resolve(__dirname, 'src/client/app.tsx'),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          configFile: path.resolve(__dirname, 'tsconfig.client.json')
        },
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ]
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [
          path.resolve(__dirname, 'node_modules/json2typescript')
        ]
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'url-loader',
        options: {
          limit: 10000,
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    historyApiFallback: true,
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:9091',
        ws: true
     },
    }
  },
  watchOptions: {
    ignored: /node_modules/
  }
};
