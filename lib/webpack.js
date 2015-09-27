// node modules
var ExtractPlugin = require("extract-text-webpack-plugin");
var merge = require("deepest-merge");
var path = require("path");
var webpack = require("webpack");

// local modules
var project = require("../lib/project");

var cssLoader = {
  test: /\.scss?$/,
  include: [
    path.join(process.cwd(), "styles")
  ]
}

module.exports = function (mode, dir) {
  var config;

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
          {
            test: /\.jsx?$/,
            include: [
              path.join(project.raw.client, "..")
            ],
            loaders: ["babel?optional[]=es7.classProperties"]
          }
        ]
      },
      resolve: {
        alias: {
          app: project.raw.client,
          styles: path.join(process.cwd(), "styles", "index.scss")
        },
        extensions: ["", ".js", ".jsx", ".json", ".css", ".scss"],
        modulesDirectories: [
          path.join(__dirname, "..", "node_modules"),
          path.join(process.cwd(), "node_modules")
        ]
      },
      resolveLoader: {
        root: path.join(__dirname, "..", "node_modules")
      }
    },

    // DEVELOPMENT CONIFG
    dev: {

    },

    // BUILD FOR PRODUCTION CONFIG
    build: {
      module: {
        loaders: [
          Object.assign(cssLoader, {
            loader: ExtractPlugin.extract('style', 'css!sass')
          })
        ]
      },
      plugins: [
        new ExtractPlugin("app.css"),
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
