"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config_1 = __importDefault(require("config"));
const connect_1 = __importDefault(require("./utils/connect"));
const logger_1 = __importDefault(require("./utils/logger"));
const logEvents_1 = require("./middleware/logEvents");
const server_1 = __importDefault(require("./server"));
const swagger_1 = __importDefault(require("./utils/swagger"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const workerPool_1 = require("./middleware/workerPool");
const port = config_1.default.get("port");
const app = (0, server_1.default)();
app.use(logEvents_1.loggingEvents);
//app.use(cors(corsOptions));
//app.use(cors({ origin: true, credentials: true }));
app.use(errorHandler_1.default);
app.listen(port, async () => {
    logger_1.default.info(`App is running at http://localhost:${port}`);
    await (0, connect_1.default)();
    (0, swagger_1.default)(app, port);
    if (process.env.WORKER_POOL_ENABLED === "1") {
        await (0, workerPool_1.init)();
    }
});
// import dotenv from "dotenv";
// dotenv.config();
// import config from "config";
// import connect from "./utils/connect";
// import logger from "./utils/logger";
// import server from "./server";
// import swaggerDocs from "./utils/swagger";
// //import errorHandler from "./middleware/errorHandler";
// const port = config.get<number>("port");
// const app = server();
// app.listen(port, async () => {
//   logger.info(`App is running at http://localhost:${port}`);
//   await connect();
//   swaggerDocs(app, port);
// });
// //app.use(errorHandler);
//# sourceMappingURL=app.js.map