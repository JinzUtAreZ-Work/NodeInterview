import express from "express";
import routesDocs from "./routesDocs";
import deserializeUser from "./middleware/deserializeUser";

import cors from "cors";
import { loggingEvents } from "./middleware/logEvents";

import credentials from "./middleware/credentials";
import corsOptions from "./utils/corsOptions";
import errorHandler from "./middleware/errorHandler";

function server() {
  const app = express();

  app.use(loggingEvents);

  app.use(credentials);

  app.use(cors(corsOptions));

  app.use(express.json());

  app.use(deserializeUser);

  routesDocs(app);

  app.get("*", function (req, res) {
    res.status(409).send({ message: "Not found" });
  });

  app.use(errorHandler);

  return app;
}

export default server;
