import fs from "fs";
import path from "path";

let root = fs.realpathSync(process.cwd());
let isClient = (typeof document === "object");

let files = {
  client: path.join(root, "app", "index.jsx"),
  server: path.join(root, "config", "server.js"),
  styles: path.join(root, "styles", "index.scss")
}

function required () {
  for (let file in files) {
    if (!fs.existsSync(files[file])) {
      console.error("\n[!] You are not in an Overreact project!\n");
      console.error(`\tError at '${files[file].replace(root, "")}'\n`);
      process.exit();
    }
  }
}

let endpoint = {};

for (let file in files) {
  if (fs.existsSync(files[file])) {
    let client = (file === "client");
    let styles = (file === "styles" && isClient);
    let server = (file === "server" && !isClient);

    if (client || styles || server) {
      endpoint[file] = require(files[file]);
    }
  }
}

export default { required, root, endpoint };
