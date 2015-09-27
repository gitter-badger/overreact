require("babel/register")({
  only: new RegExp(process.cwd()),
  ignore: /node_modules/,
  optional: ["es7.classProperties"]
});

// node modules
var fs = require("fs");
var path = require("path");

// local modules
var error = require("../lib/error");

// define endpoints
var endpoints = {
  client: path.join(process.cwd(), "app", "index.jsx"),
  server: path.join(process.cwd(), "server", "index.js")
}

var raw = Object.assign({}, endpoints);

for (var endpoint in endpoints) {
  if (fs.existsSync(endpoints[endpoint])) {
    endpoints[endpoint] = require(endpoints[endpoint]);
  } else {
    error("You are not in a overreact project!\n\n" +
          "\tError at '" + endpoints[endpoint].replace(process.cwd() + "/", "") + "'");
  }
}

endpoints.raw = raw;

module.exports = endpoints;
