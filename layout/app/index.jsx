import React from "react";
import Router, { Route } from "react-router";

import Base from "./views/Base";
import Home from "./views/Home";

let Routes = (
  <Route handler={ Base }>
    <Route path="/" handler={ Home }>

    </Route>
  </Route>
);

export default Routes;
