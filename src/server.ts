import express from "express";
import routesDocs from "./routesDocs";
import deserializeUser from "./middleware/deserializeUser";
//import { errorHandler } from "./middleware/errorHandler";

function server() {
  const app = express();
  app.use(express.json());

  app.use(deserializeUser);

  routesDocs(app);

  //app.use(errorHandler);
  return app;
}

export default server;
