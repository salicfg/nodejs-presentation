import http from "http";
import { user } from "./user.js";

const port = 5000;

const server = http.createServer(function (req, res) {
  if (req.url === "/api/example") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(user));
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
