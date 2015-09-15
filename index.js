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
  .option("build [directory]", "outputs static resources")
  .option("create [directory]", "creates a new react project")
  .option("develop", "spins a development server")
  .option("generate [view|comp] [name]", "deletes specified module")
  .option("remove [view|comp] [name]", "deletes specified module")
  .option("run [port]", "starts the server in production mode")
  .parse(process.argv);

if (cli.create) create();
