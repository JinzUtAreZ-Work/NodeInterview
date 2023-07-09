import dotenv from "dotenv";
dotenv.config();
import config from "config";
import connect from "./utils/connect";
import logger from "./utils/logger";
import server from "./server";
import swaggerDocs from "./utils/swagger";
//import errorHandler from "./middleware/errorHandler";

const port = config.get<number>("port");

const app = server();

app.listen(port, async () => {
  logger.info(`App is running at http://localhost:${port}`);

  await connect();

  swaggerDocs(app, port);
});

//app.use(errorHandler);
