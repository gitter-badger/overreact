// node modules
var exec = require("child_process").exec;
var nodemon = require("nodemon");
var path = require("path");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");

// local modules
var config = require("../lib/webpack");
var project = require("../lib/project");

module.exports = function () {
  clear(function () {
    new WebpackDevServer(webpack(config("dev")), {
      publicPath: config("dev").output.publicPath,
      hot: true,
      quiet: true
    }).listen(8080, run);
  });

  function clear (cb) {
    var d = new Date(),
        h = d.getHours(),
        m = d.getMinutes(),
        s = d.getSeconds();

    var time = ('0' + h).slice(-2) + ":" +
               ('0' + m).slice(-2) + ':' +
               ('0' + s).slice(-2);

    exec("clear", function (err, out) {
      console.log(out + "---------------------------------------");
      console.log("[" + time + "] Starting development server!");
      console.log("---------------------------------------\n");

      cb && cb();
    });
  }

  function run () {
    nodemon({
      exec: path.join(__dirname, "..", "index.js") + " run --development",
      ext: "js jsx json html",
      watch: path.join(project.path.server, "..", "*")
    });

    nodemon.on("start", clear);
  }
}
