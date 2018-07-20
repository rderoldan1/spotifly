const webpack = require('webpack');
const path = require('path');

const ROOT_PATH = path.resolve(__dirname, '../');
const BUILD_DIR = path.resolve(ROOT_PATH, '../src/public');
const APP_DIR = path.resolve(ROOT_PATH, 'src/app');

var config = {
  context: path.join(ROOT_PATH, "src"),
  devtool: false,
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: "client.min.js"
  },

  module : {
    loaders : [
      {
        test: /\.(jpe?g|png|gif)$/i,   //to support eg. background-image property
        loader:"file-loader",
        query:{
          name:'[path][name].[ext]',
          outputPath: '../'
        }
      },{
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,    //to support @font-face rule
        loader: "url-loader",
        query:{
          limit:'10000',
          name:'[path][name].[ext]',
          outputPath: '../'
        }
      }, {
        test: /\.jsx?$/,
        include : APP_DIR,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'env', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties'],
        }
      },{
        test: /\.scss$/,
        loaders: ["style-loader","css-loader","sass-loader"]
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
}

module.exports = config;
