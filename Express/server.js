import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";

import booksRoute from "./src/routes/api/booksRoute.js";
import moviesRoute from "./src/routes/api/moviesRoute.js";
import { notFound } from "./src/utils.js";

// This is represent our express application.
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

// logging to console on development mode!
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

//Routers, you can find it into routes/api
app.use("/api/movies", moviesRoute);
app.use("/api/books", booksRoute);
app.all("*", (req, res) => notFound(res));

app.listen(port, () => console.log("listening on port: " + port));
