// node modules
var merge = require("deepest-merge");
var path = require("path");

// local modules
var project = require("../lib/project");

module.exports = function (mode, dir) {
  var config;

  config = {
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
          },
          {
            test: /\.scss?$/,
            include: [
              path.join(process.cwd(), "styles")
            ],
            loaders: ["style!css!sass"]
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
    dev: {

    },
    build: {

    }
  }

  return merge(config[mode], config.main);
}
