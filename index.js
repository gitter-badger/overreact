#!/usr/bin/env node

// setup compilers and transforms
require("babel/register");

// imports
var cli  = require("commander");
var fs   = require("fs");
var path = require("path");

// gather local files
var create = require("./modules/create");
var run    = require("./modules/run");

// create program arguments
cli
  .usage("[param] [options...]")
  .option("", null)
  .option("build [directory]", "output static resources")
  .option("create [directory]", "create a new react project")
  .option("develop", "spin up a development server")
  .option("generate [view|comp] [name]", "delete specified module")
  .option("remove [view|comp] [name]", "delete specified module")
  .option("run [port]", "start the server in production mode")
  .parse(process.argv);


// create a project
if (cli.create) {
  create(cli.create);
}

// import a project
var project = importProject();

// run all project related tasks
if (cli.run) {
  run(project, true);
}

// import server and react app
function importProject () {
  var root   = process.cwd();
  var app = path.join(root, "app", "router.jsx");
  var head   = path.join(root, "config", "head.html");
  var server = path.join(root, "config", "server.js");

  if (fs.existsSync(app)) {
    if (fs.existsSync(head)) {
      if (fs.existsSync(server)) {
        return {
          root: root,
          router: require(app),
          server: require(server),
          head: fs.readFileSync(head).toString()
        }
      }
    }
  }

  console.error("\n[!] You are not in an Overreact project!\n");
  process.exit();
}
