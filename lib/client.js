require("styles");

var React = require("react");
var Router = require("react-router");

var app = require("app");

if (app.type.name === "Route") {
  Router.run(app, Router.HistoryLocation, function (Handler) {
    render(React.createElement(Handler, null));
  });
} else {
  render(app);
}

function render (comp) {
  React.render(comp, document.getElementById("app"));
}
