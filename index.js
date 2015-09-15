#!/usr/bin/env node

// setup compilers and transforms
require("babel/register");

// imports
var cli = require("commander");

// gather local files
var create = require("./modules/create");

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

if (cli.create) {
  create(cli.create);
} else {
  cli.help();
}
