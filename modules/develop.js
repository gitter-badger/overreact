import path from "path";
import nodemon from "nodemon";

import { exec } from "child_process";

import project from "../lib/project";

let index = path.join(__dirname, "..", "overreact");


export default function () {
  client();   // webpack
  server();   // nodemon
}

function client () {

}

function server () {
  nodemon({
    exec: `/usr/bin/node ${index} run --development`,
    ext: "js jsx json html",
    watch: [
      path.join(project.root, "server", "*")
    ]
  });

  nodemon.on("start", () => {
    let d = new Date(),
        h = d.getHours(),
        m = d.getMinutes(),
        s = d.getSeconds();

    let time = ('0' + h).slice(-2) + ":" +
               ('0' + m).slice(-2) + ':' +
               ('0' + s).slice(-2);

    exec("clear", (e, out) => {
      console.log(out + "---------------------------------------");
      console.log(`[${time}] Starting development server!`);
      console.log("---------------------------------------\n");
    });
  });
}
