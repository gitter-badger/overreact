import fs from 'fs';
import path from 'path';
import { ncp } from 'ncp';

let layout = path.resolve(__dirname, "..", "layout");

export default function (newDirectory) {
  // error if directory not given
  if (!newDirectory || !newDirectory.length) {
    console.error("\n[!] Directory must be specified!\n");
    return;
  }

  // clean up path
  newDirectory = path.normalize(newDirectory);

  // save the input name for output
  let saveName = newDirectory;

  // error if already exists
  if (fs.existsSync(newDirectory)) {
    console.error(`\n[!] A file or directory named '${newDirectory}' already exists!\n`);
    return;
  }

  // find potential parent directory
  let newDirectoryParent = path.resolve(newDirectory, "..");

  // check if exists
  if (!fs.existsSync(newDirectoryParent)) {
    console.error(`\n[!] The directory '${newDirectoryParent}' does not exist!\n`);
    return;
  }

  // all is well and ready to create directory
  fs.mkdirSync(newDirectory);

  // generate absolute paths for all future work
  newDirectory = fs.realpathSync(newDirectory);
  newDirectoryParent = fs.realpathSync(newDirectoryParent);

  ncp(layout, newDirectory, () => {
    let message = "\nGreat, everything is setup! :)\n" +
                  "\n" +
                  "To get started:\n\n" +
                  `   cd ${saveName}\n` +
                  "   overreact develop\n";

    console.log(message);
  });
}