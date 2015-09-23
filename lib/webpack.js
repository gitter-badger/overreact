import ExtractPlugin from "extract-text-webpack-plugin";
import merge from "deepest-merge";
import path from "path";
import webpack from "webpack";

import project from "../lib/project";

let host = "http://localhost:8080";

export default function (mode, directory) {
  let modes = {
    // shared config options
    main: {
      context: project.root,
      entry: [
        "./app/index.jsx"
      ],
      output: {
        filename: "app.js"
      },
      module: {
        loaders: [
          {
            test: /\.jsx?$/,
            include: path.join(project.client, ".."),
            loaders: ["babel?optional[]=es7.classProperties"],
          }
        ]
      },
      resolve: {
        extensions: ["", ".js", ".jsx", ".json", ".css", ".scss"]
      },
      resolveLoader: {
        root: path.join(__dirname, "..", "node_modules")
      },
    },

    // config options for build
    build: {
      output: {
        path: directory
      },
      plugins: [
        new ExtractPlugin(path.join(directory, "app.css")),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin()
      ],
      module: {
        loaders: [
          {
            test: /\.scss?$/,
            include: path.join(project.styles, ".."),
            loader: ExtractPlugin.extract('style', 'css!sass')
          }
        ]
      }
    },

    // config options for development
    develop: {
      output: {
        publicPath: `${host}/assets/`
      }
    }
  }

  return merge(modes.main, modes[mode]);
}
