import fs from "fs";
import path from "path";

import project from "../lib/project";

export default function (type, _name, remove = false) {
  let dir = { app: null, styles: null };
  let generate = !remove;
  if (!_name) {
    console.error("\n[!] Two parameters required! [type] [name]\n");
    process.exit();
  }

  let name = {
    lower: _name.charAt(0).toLowerCase() + _name.substr(1),
    upper: _name.charAt(0).toUpperCase() + _name.substr(1)
  }

  for (let i in dir) {
    dir[i] = path.join(project.root, i, `${type}s`);
  }


  let appPath = path.join(dir.app, `${name.upper}.jsx`);
  let stylePath = path.join(dir.styles, `${name.lower}.scss`);

  if (generate) {
    for (let i in dir) {
      if (!fs.existsSync(dir[i])) fs.mkdirSync(dir[i]);
    }

    if (fs.existsSync(appPath) || fs.existsSync(stylePath)) {
      console.error("\n[!] Module already exists! Aborting.\n");
      process.exit();
    }

    let template = { jsx: null, scss: null };
    for (let type in template) {
      template[type] = fs.readFileSync(path.join(__dirname, "..", "templates", `file.${type}`)).toString();
    }

    fs.writeFileSync(appPath, template.jsx.replace("~", name.upper));
    fs.writeFileSync(stylePath, template.scss.replace("~", name.lower));
  }

  if (remove) {
    let unlink = false;

    [appPath, stylePath].forEach((p) => {
      if (fs.existsSync(p)) {
        unlink = true;
        fs.unlinkSync(p);

        if (fs.readdirSync(path.join(p, "..")).length == 0) {
          fs.rmdirSync(path.join(p, ".."));
        }
      }
    });

    if (!unlink) {
      console.error("\n[!] Module does not exist!\n");
      process.exit();
    }
  }

  let shape = remove ? "-" : "+";
  let action = remove ? "Deleted" : "Created";

  console.log(`\n[${shape}] ${action} 'app/${type}s/${name.upper}.jsx' and 'styles/${type}s/${name.lower}.scss'\n`);
}
