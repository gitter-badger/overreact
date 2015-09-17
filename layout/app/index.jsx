import React from "react";
import Router, { Route } from "react-router";

import Base from "./views/Base";

let routes = (
  <Route path="/" component={ Base }>

  </Route>
)

!(typeof document) && Router.run(routes, Router.HistoryLocation, (Handler) => {
  React.render(<Handler />, document.getElementById("app"));
});

export default routes;
