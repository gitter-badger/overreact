import fs from "fs";
import path from "path";
import remove from "remove";
import webpack from "webpack";

import config from "../lib/webpack.js";

export default function (directory, cb) {
  if (typeof directory !== "string") directory = "/tmp/overreact";

  // throw error if parent doesn't exist
  if (!fs.existsSync(path.join(directory, ".."))) {
    console.error("\n[!] Parent directory does not exist!\n");
    process.exit();
  }

  if (fs.existsSync(directory)) {
    if (directory.indexOf("/tmp") === 0) {
      remove.removeSync(directory);
    } else {
      console.error("\n[!] Output directory already exists!\n");
      process.exit();
    }
  }

  fs.mkdirSync(directory);

  directory = fs.realpathSync(directory);

  // build files with webpack
  webpack(config("build", directory), (err, stats) => {
    console.log(stats.toString());
    if (cb) cb(directory);
  });
}
