// node modules
import cli from "commander";
import fs from "fs";
import path from "path";

// modules
import build from "./modules/build";
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
  .option("dev [port]", "start development server")
  .option("generate [type] [name]", "create specified module")
  .option("remove [type] [name]", "delete specified module")
  .option("start [port]", "start production server")
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

if (cli.build) {
  project.required();
  build(cli.build)
}

if (cli.create) {
  create(cli.create);
}

if (cli.start || development) {
  project.required();
  cli.start = (cli.start && Number(cli.start) === 1) ? undefined : cli.start;
  build(false, (directory) => {
    run(development, cli.start, directory);
  });
}

if (cli.dev) {
  project.required();
  develop();
}

if (cli.generate || cli.remove) {
  project.required();
  generate(cli.generate || cli.remove, cli.args[0], !!cli.remove);
}
