// node modules
var ExtractPlugin = require("extract-text-webpack-plugin");
var merge = require("deepest-merge");
var path = require("path");
var webpack = require("webpack");

// local modules
var project = require("../lib/project");

var loader = {
  css: {
    test: /\.scss?$/,
    include: [
      project.path.styles
    ]
  },
  js: {
    test: /\.jsx?$/,
    include: [
      path.join(project.path.client, "..")
    ],
    loaders: ["babel?optional[]=es7.classProperties"]
  }
}

module.exports = function (mode, dir) {
  var config;

  if (mode === "dev") {
    loader.js.loaders.unshift("react-hot");
    ExtractPlugin = null;
  }

  if (typeof dir === "undefined") {
    dir = "/tmp";
  }

  config = {

    // SHARED CONFIG
    main: {
      context: __dirname,
      entry: [
        "../lib/client.js"
      ],
      output: {
        filename: "app.js",
        path: dir
      },
      module: {
        loaders: [
          loader.js
        ]
      },
      resolve: {
        alias: {
          app: project.path.client,
          styles: project.path.styles
        },
        extensions: ["", ".js", ".jsx", ".json", ".css", ".scss"],
        modulesDirectories: [
          path.join(project.root, "node_modules")
        ]
      },
      resolveLoader: {
        root: path.join(__dirname, "..", "node_modules")
      }
    },

    // DEVELOPMENT CONIFG
    dev: {
      devtool: "source-map",
      entry: [
        "webpack-dev-server/client?http://localhost:8080",
        "webpack/hot/only-dev-server"
      ],
      output: {
        publicPath: 'http://localhost:8080/assets/'
      },
      module: {
        loaders: [
          Object.assign(loader.css, {
            loaders: ["style", "css", "sass"]
          })
        ]
      },
      plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
      ]
    },

    // BUILD FOR PRODUCTION CONFIG
    build: {
      module: {
        loaders: [
          Object.assign(loader.css, {
            loader: ExtractPlugin && ExtractPlugin.extract("style", "css!sass")
          })
        ]
      },
      plugins: [
        ExtractPlugin && new ExtractPlugin("app.css"),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
          comments: false,
          mangle: {
            except: ["Route"]
          }
        })
      ]
    }
  }

  return merge(config[mode], config.main);
}
