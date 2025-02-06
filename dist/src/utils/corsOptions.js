"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = void 0;
const config_1 = __importDefault(require("config"));
let allowedOrigins = config_1.default.get("allowedOrigins");
//console.log(allowedOrigins);
exports.corsOptions = {
    origin: (origin, callback) => {
        //console.log("cors", allowedOrigins);
        //console.log("cors", allowedOrigins.indexOf(origin) !== -1, !origin);
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    optionsSuccessStatus: 200,
};
exports.default = exports.corsOptions;
//# sourceMappingURL=corsOptions.js.map