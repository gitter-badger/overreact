import path from "path";
import fs from "fs";

let root = fs.realpathSync(process.cwd());
let isClient = (typeof document === "object");

let files = {
  client: path.join(root, "app", "index.jsx"),
  server: path.join(root, "server", "index.js"),
  styles: path.join(root, "styles", "index.scss"),
  modules: path.join(root, "node_modules")
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

export default Object.assign({ required, root }, files);
