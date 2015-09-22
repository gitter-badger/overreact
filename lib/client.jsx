import React from "react";
import Router from "react-router";

import { client, styles } from "../lib/project";

let App = client;

let app = React.render(<App />, document.getElementById("app"));

export default app;
