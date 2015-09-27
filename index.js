#!/usr/bin/env node

// node modules

// lcoal modules
var error = require("./lib/error");

// map cmd to modules
var commands = {
  run: "./cmd/run",
  build: "./cmd/build",
  dev: "./cmd/dev"
}

// cut off used args
global.args = process.argv.slice(2);

// gather command
var command = commands[global.args[0]];

// remove argument used on command
global.args = global.args.slice(1);

// require and run if valid command
command ? require(command)() : error("Invalid argument!");
