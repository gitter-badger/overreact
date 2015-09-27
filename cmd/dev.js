// node modules
var exec = require("child_process").exec;
var nodemon = require("nodemon");
var path = require("path");

module.exports = function () {
  require("../lib/project");

  nodemon({
    exec: path.join(__dirname, "..", "index.js") + " run --development",
    ext: "js jsx json html",
    watch: path.join(process.cwd(), "server", "*")
  });

  nodemon.on("start", function () {
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
    });
  });
}
