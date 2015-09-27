// node modules
var compress = require('compression');
var ejs = require("ejs");
var fs = require("fs");
var minify = require('html-minifier').minify;
var path = require("path");

// project's node modules
var express = require(path.join(process.cwd(), "node_modules", "express"));
var React = require(path.join(process.cwd(), "node_modules", "react"));
var Router = require(path.join(process.cwd(), "node_modules", "react-router"));

// local modules
var build = require("../cmd/build");
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

    server.use(compress());

    server.use("/", publicFiles());
    server.use("/assets/", staticFiles());
    server.use("/assets/", buildFiles(dir));

    server.use("*", app);

    server.listen(server.get("port"), function () {
      var type = server.get("production") ? "Production" : "Development";
      console.log(type + " running at http://localhost:" + server.get("port") + "\n");
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
    return fs.readFileSync(head)
            .toString()
            .replace("<head>", "")
            .replace("</head>", "");
  }

  return "";
}

function app (req, res) {
  setTimeout(function () {
    if (project.client.type.name === "Route") {
      Router.run(project.client, req.originalUrl, function (Handler) {
        server.set("App", React.createElement(Handler, null));
      });
    } else {
      server.set("App", project.client);
    }

    var html = fs.readFileSync(path.join(__dirname, "..", "views", "index.ejs")).toString();

    html = ejs.render(html, {
      app: React.renderToString(server.get("App")),
      head: server.get("head"),
      production: server.get("production")
    });

    res.send(minify(html, {
      removeComments: true,
      collapseWhitespace: true,
    }));
  });
}
