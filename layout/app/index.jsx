import React from "react";
import { Route, HistoryLocation } from "react-router";

import Base from "./views/Base";

routes = (
  <Route path="/" component={ Base }>

  </Route>
)

if (typeof document !== undefined) {
  Router.run(routes, HistoryLocation, (Handler) => {
    React.render(<Handler />, document.getElementById("app"));
  });
}

export default routes;
