"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.credentials = void 0;
const config_1 = __importDefault(require("config"));
//const allowedOrigins = require("../config/allowedOrigins");
const credentials = (req, res, next) => {
    //   console.log("request", req.headers);
    //   console.log("response", res.header);
    const origin = req.headers.origin;
    const allowedOrigins = config_1.default.get("allowedOrigins");
    // console.log(
    //   "allowedOrigins",
    //   allowedOrigins.includes(origin),
    //   origin,
    //   allowedOrigins
    // );
    if (allowedOrigins.includes(origin)) {
        //console.log("creds", allowedOrigins);
        res.header("Access-Control-Allow-Credentials", "true");
    }
    next();
};
exports.credentials = credentials;
exports.default = exports.credentials;
//# sourceMappingURL=credentials.js.map