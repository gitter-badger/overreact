// node modules
import cli from "commander";
import fs from "fs";
import path from "path";

// modules
import create from "./modules/create";
import generate from "./modules/generate";
import run from "./modules/run";

// libs
import project from "./lib/project";

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


// parse
let enviroment = {
  development: null,
  production: null
}

for (let env in enviroment) {
  enviroment[env] = cli.rawArgs.join(" ").indexOf("run --${env}") > -1;
}

/*
  handle commands
*/

if (cli.create) {
  create(cli.create);
}

if (cli.deploy || enviroment.production ) {
  project.required();
  cli.deploy = (cli.deploy && Number(cli.deploy) === 1) ? undefined : cli.deploy;
  run(true, cli.deploy);
}

if (cli.generate || cli.remove) {
  project.required();
  generate(cli.generate || cli.remove, cli.args[0], !!cli.remove);
}
