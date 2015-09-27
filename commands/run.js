require("babel/register")({
  only: new RegExp(process.cwd()),
  ignore: /node_modules/,
  optional: ["es7.classProperties"]
});

// node modules
var fs = require("fs");
var path = require("path");

// project's node modules
var express = require(path.join(process.cwd(), "node_modules", "express"));
var React = require(path.join(process.cwd(), "node_modules", "react"));
var Router = require(path.join(process.cwd(), "node_modules", "react-router"));

// local modules
var build = require("../commands/build");
var error = require("../lib/error");
var project = require("../lib/project");
var server = project.server;

module.exports = function () {
  server.set("production", production());

  server.get("production") ? build(serve) : serve();

  function serve (dir) {
    // server props
    server.set("head", head());
    server.set("port", port() || 3000);
    server.set("views", path.join(__dirname, "..", "views"));

    server.use("/", publicFiles());
    server.use("/assets/", staticFiles());
    server.use("/assets/", buildFiles(dir));

    server.use("*", app);

    server.listen(server.get("port"), function () {
      var type = server.get("production") ? "Production" : "Development";
      console.log(type + " running at http://localhost:" + server.get("port"));
    });
  }
}

function buildFiles (staticDir) {
  return server.get("production") ?
    express.static(staticDir) :
    function (req, res) {
      res.redirect("http://localhost:8080/assets" + req.url);
    }
}

function staticFiles () {
  return express.static(path.join(process.cwd(), "assets"));
}

function publicFiles () {
  return express.static(path.join(process.cwd(), "public"));
}

function port () {
  for (var i = 0; i < global.args.length; i++) {
    if (global.args[i] == "--port") {
      if (i >= global.args.length || Number(global.args[i + 1]) === NaN) {
        error("Please specify a valid port.")
      }

      return Number(global.args[i + 1]);
    }
  }
}

function production () {
  for (var i = 0; i < global.args.length; i++) {
    if (global.args[i] == "--development")
      return false;
  }

  return true;
}

function head () {
  var head = path.join(process.cwd(), "server", "views", "head.html");
  if (fs.existsSync(head)) {
    return fs.readFileSync(head).toString();
  }

  return "";
}

function app (req, res) {
  if (project.client.type.name === "Route") {
    Router.run(project.client, req.originalUrl, function (Handler) {
      server.set("App", React.createElement(Handler, null));
    });
  } else {
    server.set("App", project.client);
  }

  res.render("index.ejs", {
    app: React.renderToString(server.get("App")),
    head: server.get("head")
  });
}
