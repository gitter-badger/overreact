import fs from "fs";
import path from "path";
import express from "express";

import project from "../lib/project";

// require project's modules
let React = require(path.join(project.root, "node_modules", "react"));
let Router = require(path.join(project.root, "node_modules", "react-router"));

export default function (development, port = 3000, tmp) {
  let server = require(project.server);
  let production = !development;

  // config server
  server.set("views", path.join(__dirname, "..", "lib"));
  server.set("production", production);
  server.set("environment", production ? "Production" : "Development");
  server.set("host", production ? "" : "//localhost:8080");
  server.set("build-files", tmp);

  routes(server);
  application(server);

  // start server on specified port
  server.listen(port, () => {
    console.log(`${server.get("environment")} server is running at http://localhost:${port}\n`);
  });
}

function application (server) {
  let client = require(project.client);

  // respond with react app as default
  server.use("*", (req, res) => {
    if (client.type.name === "Route") {
      Router.run(client, req.originalUrl, (Handler) => {
        render(React.createElement(Handler, null));
      });
    } else {
      render(client);
    }

    function render (element) {
      res.render("index.ejs", {
        app: server.get("production") ? React.renderToString(element) : "",
        host: server.get("host"),
        head: getHead()
      });
    }
  });
}

function getHead () {
  let headLocation = path.join(project.root, "server", "views", "head.html");

  if (fs.existsSync(headLocation)) {
    let head = fs.readFileSync(headLocation).toString();
    return head.replace("<head>", "").replace("</head>", "");
  }

  return "";
}

function routes (server) {
  // static build files
  if (server.get("build-files") && fs.existsSync(server.get("build-files"))) {
    server.use("/assets/", express.static(server.get("build-files")));
  }

  // stati
  let assets = path.join(project.root, "assets");
  if (!fs.existsSync(assets)) server.use("/assets/", express.static(assets));

  // serve public files
  let pub = path.join(project.root, "public");
  if (!fs.existsSync(pub)) server.use("/", express.static(pub));
}
