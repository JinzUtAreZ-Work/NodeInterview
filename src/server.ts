import express from "express";
import routesDocs from "./routesDocs";
import deserializeUser from "./middleware/deserializeUser";
//import { errorHandler } from "./middleware/errorHandler";
import corsOptions from "./utils/corsOptions";
import cors from "cors";
import credentials from "./middleware/credentials";

function server() {
  const app = express();
  //NOTE: newly added
  app.use(credentials);
  app.use(cors(corsOptions));
  // newly added

  app.use(express.json());

  app.use(deserializeUser);

  routesDocs(app);

  //app.use(errorHandler);
  return app;
}

export default server;

// import express from "express";
// import routesDocs from "./routesDocs";
// import deserializeUser from "./middleware/deserializeUser";

// import cors from "cors";
// import { loggingEvents } from "./middleware/logEvents";

// import credentials from "./middleware/credentials";
// import corsOptions from "./utils/corsOptions";
// import errorHandler from "./middleware/errorHandler";

// function server() {
//   const app = express();

//   app.use(loggingEvents);

//   app.use(credentials);

//   app.use(cors(corsOptions));

//   app.use(express.json());

//   app.use(deserializeUser);

//   routesDocs(app);

//   app.get("*", function (req, res) {
//     res.status(409).send({ message: "Not found" });
//   });

//   //app.use(errorHandler);

//   return app;
// }

// export default server;
