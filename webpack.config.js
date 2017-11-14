const path = require('path');

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
      }
    ]
  },
  externals: [
    (function () {
      var IGNORES = [
       'electron'
      ];
      return function (context, request, callback) {
        if (IGNORES.indexOf(request) >= 0) {
          return callback(null, "require('" + request + "')");
        }
        return callback();
      };
    })()
  ],
  watch: true
};
