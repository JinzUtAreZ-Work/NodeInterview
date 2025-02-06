"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routesDocs_1 = __importDefault(require("./routesDocs"));
const deserializeUser_1 = __importDefault(require("./middleware/deserializeUser"));
//import { errorHandler } from "./middleware/errorHandler";
const corsOptions_1 = __importDefault(require("./utils/corsOptions"));
const cors_1 = __importDefault(require("cors"));
const credentials_1 = __importDefault(require("./middleware/credentials"));
function server() {
    const app = (0, express_1.default)();
    //NOTE: newly added
    app.use(credentials_1.default);
    app.use((0, cors_1.default)(corsOptions_1.default));
    // newly added
    app.use(express_1.default.json());
    app.use(deserializeUser_1.default);
    (0, routesDocs_1.default)(app);
    //app.use(errorHandler);
    return app;
}
exports.default = server;
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
//# sourceMappingURL=server.js.map