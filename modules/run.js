import fs from "fs";
import path from "path";
import express from "express";
import React from "react";
import Router from "react-router";

import project from "../lib/project";

export default function (production, port = 3000, tmp) {
  let { server } = project.endpoints;

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
    console.log(`${server.get("environment")} server is running at http://localhost:${port}`);
  });
}

function application (server) {
  // respond with react app as default
  server.use("*", (req, res) => {
    // run react router with incoming url
    Router.run(project.client, req.originalUrl, (Handler) => {
      // generate react element without JSX
      let handler = React.createElement(Handler, null);

      // render index page for correct environment
      res.render("index.ejs", {
        app: server.get("production") ? React.renderToString(handler) : "",
        host: server.get("host"),
        head: getHead()
      });

    });
  });
}

function getHead () {
  let headLocation = path.join(project.root, "config", "head.html");

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
