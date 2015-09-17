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
  .option("create [directory]", "create new react project")
  .option("deploy [port]", "start production server")
  .option("dev [port]", "start development server")
  .option("generate [view,comp] [name]", "create specified module")
  .option("remove [view,comp] [name]", "delete specified module")
  .parse(process.argv);


// import a project
var project = importProject();

if (cli.create) {
  create(cli.create);
}

if (cli.deploy) {
  needsProject();
  cli.deploy = (Number(cli.deploy) === 1) ? undefined : cli.deploy;
  run(project, true, cli.deploy);
}

if (cli.generate || cli.remove) {
  needsProject();
  generate(project, (cli.generate || cli.remove), cli.args[0], !!cli.remove);
}

if (cli.args[0] == "sydney") {
  console.log("<3");
}

// import server and react app
function importProject () {
  var root   = process.cwd();
  var app    = path.join(root, "app", "index.jsx");
  var head   = path.join(root, "config", "head.html");
  var server = path.join(root, "config", "server.js");

  if (fs.existsSync(app)) {
    if (fs.existsSync(head)) {
      if (fs.existsSync(server)) {
        return {
          root: root,
          routes: require(app),
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
