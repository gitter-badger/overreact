import React from "react";
import Router, { Route } from "react-router";

import Base from "./views/Base";

let tmp = <h1>Testing without router.</h1>

let Routes = (
  <Route path="/" component={ Base }>

  </Route>
);

export default Routes;
