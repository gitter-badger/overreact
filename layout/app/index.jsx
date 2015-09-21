import React from "react";
import Router, { Route } from "react-router";

import Base from "./views/Base";

let Routes = (
  <Route path="/" component={ Base }>

  </Route>
)

let tmp = <h1>Testing without router.</h1>

export default tmp || Routes;
