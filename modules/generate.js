import fs from "fs";
import path from "path";

import project from "../lib/project";

let jsx =
`import React from "react";

export default class ~ extends React.Component {

}
`

let scss =
`.~ {

}
`

export default function (type, _name, remove = false) {
  let dir = { app: null, styles: null };
  let name = _name.toLowerCase();
  let Name = name.charAt(0).toUpperCase() + name.substr(1);

  if (type == "view" || type == "comp") {
    for (let i in dir) {
      dir[i] = path.join(project.root, i, `${type}s`);
    }
  } else {
    console.error("\n[!] Invalid type. [view,comp]");
    process.exit();
  }

  for (let i in dir) {
    if (!fs.existsSync(dir[i])) fs.mkdirSync(dir[i]);
  }

  let appPath = path.join(dir.app, `${Name}.jsx`);
  let stylePath = path.join(dir.styles, `${name}.scss`);

  if (!remove) {
    if (fs.existsSync(appPath) || fs.existsSync(stylePath)) {
      console.error("\n[!] Module already exists! Aborting.\n");
      process.exit();
    }

    fs.writeFileSync(appPath, jsx.replace("~", Name));
    fs.writeFileSync(stylePath, scss.replace("~", name));
  }

  if (remove) {
    if (fs.existsSync(appPath) && fs.existsSync(stylePath)) {
      fs.unlinkSync(appPath);
      fs.unlinkSync(stylePath);
    } else {
      console.error("\n[!] Module does not exist!\n");
      process.exit();
    }
  }

  let shape = remove ? "-" : "+";
  let action = remove ? "Deleted" : "Created";

  console.log(`\n[${shape}] ${action} 'app/${type}s/${Name}.jsx' and 'styles/${type}s/${name}.scss'\n`);
}
