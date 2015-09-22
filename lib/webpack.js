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
      context: __dirname,
      entry: "./client.jsx",
      output: {
        filename: "app.js"
      },
      module: {
        loaders: [
          {
            test: /\.jsx?$/,
            include: path.join(project.root, "app"),
            loaders: ["react-hot", "babel"],
          }
        ]
      },
      resolve: {
        extensions: ["", ".js", ".jsx", ".json", ".css", ".scss"]
      }
    },

    // config options for build
    build: {
      output: {
        path: directory
      },
      plugins: [
        new ExtractPlugin("app.css"),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin()
      ],
      module: {
        loaders: [
          {
            test: /\.scss?$/,
            include: path.join(__dirname, '..', 'styles'),
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
