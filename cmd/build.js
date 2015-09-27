// node modules
var fs = require("fs");
var path = require("path");
var rmdir = require("rmdir");
var webpack = require("webpack");

// local modules
var config = require("../lib/webpack");
var error = require("../lib/error");

module.exports = function (callback) {
  var dir = TMP = "/tmp/overreact";

  if (typeof callback === "undefined") {
    if (!global.args.length) {
      error("Must provide a path to a new directory!")
    }

    dir = global.args[0];
  }

  if (dir !== TMP) {
    // error if no parent
    if (!fs.existsSync(path.join(dir, "..")))
      error("Parent directory does not exist!");

    // error out if occupied
    if (fs.existsSync(dir))
      error("Directory '" + dir + "' already exists!");

    next();
  } else {
    // delete temp folder
    rmdir(dir, next);
  }

  function next () {
    fs.mkdirSync(dir);

    webpack(config("build", dir), function (err, out) {
      callback && callback(dir);
    });
  }
}
