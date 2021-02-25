const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  devtool: 'eval-cheap-module-source-map',
  entry: './src/index.js',
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'assets/js'),
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.tmpl.html'),
      filename: path.resolve(__dirname,'index.html'),
      // excludeChunks: ['login', 'runtime~login'],
      inject: 'body'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              ["@babel/plugin-proposal-class-properties", { "loose": true }]
            ]
          }
        }
      }, { test: /\.css$/,
        use: [{
        loader: "style-loader",
          options: {
            insert: 'head'
          }
        }, {
          loader: "css-loader"
        }]
      }, {
        test: /\.(png|svg|gif)$/,
    // exclude: [PATHS.images],
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]'
          }
        }
        
      }, 
      // fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)(\?.*$|$)/,
        //include: path.resolve(__dirname, 'fonts'),
        // include: PATHS.fonts,
        use: {
          loader: 'url-loader',
          options: {
            //name: 'fonts/[name].[hash].[ext]',
            limit: 100000
          },
        },
      }
    ]
  },
  watch: true,
  watchOptions: {
    ignored: ["node_modules/**"],
    aggregateTimeout: 200,
    poll: 1000
  },
  externals: {
    'electron': 'require("electron")',
    'net': 'require("net")',
    'remote': 'require("remote")',
    'shell': 'require("shell")',
    'app': 'require("app")',
    'ipc': 'require("ipc")',
    'fs': 'require("fs")',
    'buffer': 'require("buffer")',
    'system': '{}',
    'file': '{}',
    'electron-store': 'require("electron-store")',
    //'conf' : 'require("conf")',
    'electron-config': 'require("electron-config")'
  }
};