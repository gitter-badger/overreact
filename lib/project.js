// node modules
var fs = require("fs");
var path = require("path");

// local modules
var error = require("../lib/error");

// client project root
var root = process.cwd();

// can be required
var requirable = {
  "client": path.join(root, "app", "index.jsx"),
  "server": path.join(root, "server", "index.js"),
  "styles": path.join(root, "styles", "index.scss"),
  "express": path.join(root, "node_modules", "express/"),
  "react": path.join(root, "node_modules", "react/"),
  "react-router": path.join(root, "node_modules", "react-router/")
}

var required = false;

function _require (name) {

  if (fs.existsSync(requirable[name])) {
    if (!required) {
      require("babel/register")({
        only: new RegExp(root),
        ignore: /node_modules/,
        optional: ["es7.classProperties"]
      });
      
      required = false;
    }

    return require(requirable[name]);
  } else {
    error("The project is missing a required module!\n" +
          "\n\tError at '" + requirable[name].replace(root + "/", "") + "'");
  }
}

module.exports = { root: root, require: _require, path: requirable };
