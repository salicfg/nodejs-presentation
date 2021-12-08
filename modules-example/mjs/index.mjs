import http from "http";
// If we use ES6 modules import for *.json files, we have to start our app with node --experimental-json-modules index.mjs
import * as user from "./user.json";

const port = 5000;

const server = http.createServer(function (req, res) {
  if (req.url === "/api/example") {
    res.writeHead(200, { "Content-Type": "application/json" });
    // If we use ES6 modules import for *.json files, we have to access .default.
    res.end(JSON.stringify(user.default));
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Not Found" }));
  }
});

server.listen(port, function (err) {
  if (err) {
    console.error("Error on listening", err);
  } else {
    console.log("listening on port " + port);
  }
});
