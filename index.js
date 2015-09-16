#!/usr/bin/env node

var babelOptions = {
  "optional": ["es7.classProperties"]
}

// install babel
require("babel/register")(babelOptions);

// imports
var cli  = require("commander");
var fs   = require("fs");
var path = require("path");

// gather local files
var create    = require("./modules/create");
var generate  = require("./modules/generate");
var run       = require("./modules/run");

// create program arguments
cli
  .usage("[param] [options...]")
  .option("", null)
  .option("build [directory]", "output static resources")
  .option("create [directory]", "create a new react project")
  .option("develop", "spin up a development server")
  .option("generate [view,comp] [name]", "delete specified module")
  .option("remove [view,comp] [name]", "delete specified module")
  .option("run [port]", "start the server in production mode")
  .parse(process.argv);


// import a project
var project = importProject();

if (cli.create) {
  create(cli.create);
}

if (cli.run) {
  needsProject();
  run(project, true, cli.run);
}

if (cli.generate || cli.remove) {
  needsProject();
  generate(project, (cli.generate || cli.remove), cli.args[0], !!cli.remove);
}

// import server and react app
function importProject () {
  var root   = process.cwd();
  var app    = path.join(root, "app", "router.jsx");
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

  return false;
}

function needsProject () {
  if (!project) {
    console.error("\n[!] You are not in an Overreact project!\n");
    process.exit(0);
  }
}
