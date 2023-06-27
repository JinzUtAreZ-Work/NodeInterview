import dotenv from "dotenv";
dotenv.config();
import config from "config";
import cors from "cors";
import connect from "./utils/connect";
import logger from "./utils/logger";
import { loggingEvents } from "./middleware/logEvents";
import server from "./server";
import swaggerDocs from "./utils/swagger";
import corsOptions from "./utils/corsOptions";
import errorHandler from "./middleware/errorHandler";

const port = config.get<number>("port");

const app = server();

app.use(loggingEvents);

app.use(cors(corsOptions));

app.use(errorHandler);

app.listen(port, async () => {
  logger.info(`App is running at http://localhost:${port}`);

  await connect();

  swaggerDocs(app, port);
});
