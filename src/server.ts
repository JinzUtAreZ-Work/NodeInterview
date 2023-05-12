import express from "express";
import routesDocs from "./routesDocs";
import deserializeUser from "./middleware/deserializeUser";

function server() {
  const app = express();
  app.use(express.json());

  app.use(deserializeUser);
  routesDocs(app);

  return app;
}

export default server;
