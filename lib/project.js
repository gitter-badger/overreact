

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

var transformed = false;


// loop endpoints
for (var endpoint in endpoints) {

  // check if endpoint exists
  if (fs.existsSync(endpoints[endpoint])) {

    // replace object with module
    endpoints[endpoint] = require(endpoints[endpoint]);
  } else {

    // error if not found
    error("You are not in a overreact project!\n\n" +
          "\tError at '" + endpoints[endpoint].replace(process.cwd() + "/", "") + "'");
  }
}

module.exports = endpoints;
