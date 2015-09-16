import fs from "fs";
import path from "path";

export default function (project, production, port = 3000) {
  let env = production ? "Production" : "Development";

  project.server.listen(port, () => {
    console.log(`${env} server is running at http://localhost:${port}`);
  });
}
