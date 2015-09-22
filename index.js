// node modules
import cli from "commander";
import fs from "fs";
import path from "path";

// modules
import create from "./modules/create";
import develop from "./modules/develop";
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

let development = cli.rawArgs.join(" ").indexOf(`run --development`) > -1;

class Foo {
  bar = () => {
    console.log("Foobar");
  }
}

/*
  handle commands
*/

if (cli.create) {
  create(cli.create);
}

if (cli.deploy || development) {
  project.required();
  cli.deploy = (cli.deploy && Number(cli.deploy) === 1) ? undefined : cli.deploy;
  run(development, cli.deploy);
}

if (cli.dev) {
  project.required();
  develop();
}

if (cli.generate || cli.remove) {
  project.required();
  generate(cli.generate || cli.remove, cli.args[0], !!cli.remove);
}
