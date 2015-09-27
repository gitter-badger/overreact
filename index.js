#!/usr/bin/env node

// node modules

// lcoal modules
var error = require("./lib/error");

// map commands to modules
var commands = {
  run: "./commands/run",
  build: "./commands/build"
}

// cut off used args
global.args = process.argv.slice(2);

// gather command
var command = commands[global.args[0]];

// remove argument used on command
global.args = global.args.slice(1);

// require and run if valid command
command ? require(command)() : error("Invalid argument!");
