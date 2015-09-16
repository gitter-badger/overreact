import fs from "fs";
import path from "path";
import express from "express";
import React from "react";
import Router from "react-router";

export default function (project, production, port = 3000, tmp) {
  let env = production ? "Production" : "Development";
  let { head, server } = project;

  // set views location
  server.set("views", path.join("..", "lib", "views"));

  // strip head of wrapper tags
  head = head.replace("<head>", "");
  head = head.replace("</head>", "");

  // set host based on environment
  let host = production ? "" : "//localhost:8080";

  // serve static build files
  if (tmp && fs.existsSync(tmp)) {
    server.use("/assets/", express.static(tmp));
  }

  // serve static assets
  let assets = path.join(project.root, "assets");
  if (fs.existsSync(assets)) {
    server.use("/assets/", express.static(assets));
  } else {
    console.error("\n[!] Assets directory not found!\n");
    return;
  }

  // serve public files
  let pub = path.join(project.root, "public");
  if (fs.existsSync(pub)) {
    server.use("/", express.static(pub));
  } else {
    console.error("\n[!] Public directory not found!\n");
    return;
  }

  // respond with react app for all 404s
  server.use("*", (req, res) => {
    Router.run(project.router, req.originalUrl, (Handler) => {
      let app = production ? React.renderToString(React.createElement(Handler, null)) : "";
      res.render("index.ejs", { app, head, host });
    });
  });

  // start server on specified port
  server.listen(port, () => {
    console.log(`${env} server is running at http://localhost:${port}`);
  });
}
