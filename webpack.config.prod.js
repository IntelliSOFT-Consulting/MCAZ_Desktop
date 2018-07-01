const path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: './assets/js/bundle.js',
    path: path.resolve(__dirname)
  },
  module: {
    loaders: [{
        test: /\.js$/,
        loader: 'babel-loader',
      },
      { test: /\.css$/,
        use: [{
        loader: "style-loader",
          options: {
            insertAt: 'top'
          }
        }, {
          loader: "css-loader"
        }
        ]
      }
    ]
  },
  plugins: [
    new webpack.IgnorePlugin(/\/iconv-loader$/)
  ],
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
    /*
    (function () {
      var IGNORES = [
       'electron', 'electron-config', 'fs'
      ];
      return function (context, request, callback) {
        if (IGNORES.indexOf(request) >= 0) {
          return callback(null, "require('" + request + "')");
        }
        return callback();
      };
    })()*/
  },
  watch: false
};
