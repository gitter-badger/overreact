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

// modules
var create    = require("./modules/create");
var generate  = require("./modules/generate");
var run       = require("./modules/run");

// libs
var project = require("./lib/project");

// create program arguments
cli
  .usage("[param] [options...]")
  .option("", null)
  .option("build [directory]", "output static resources")
  .option("create [directory]", "create new react project")
  .option("deploy [port]", "start production server")
  .option("dev [port]", "start development server")
  .option("generate [type] [name]", "create specified module")
  .option("remove [type] [name]", "delete specified module")
  .parse(process.argv);

var runCommand = {
  development: cli.rawArgs.join(" ").indexOf("run --development"),
  production: cli.rawArgs.join(" ").indexOf("run --production")
}


if (cli.create) {
  create(cli.create);
}

if (cli.deploy || runCommand.production ) {
  project.required();
  cli.deploy = (cli.deploy && Number(cli.deploy) === 1) ? undefined : cli.deploy;
  run(true, cli.deploy);
}

if (cli.generate || cli.remove) {
  project.required();
  generate(cli.generate || cli.remove, cli.args[0], !!cli.remove);
}

if (cli.args[0] == "sydney") {
  console.log("<3");
}
