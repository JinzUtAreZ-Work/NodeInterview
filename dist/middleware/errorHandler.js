"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logEvents_1 = require("./logEvents");
const moment_1 = __importDefault(require("moment"));
const dateToday = (0, moment_1.default)().format(moment_1.default.HTML5_FMT.DATE);
function errorHandler(err, req, res) {
    console.error("errorhandler", err.name, err.message);
    if (err) {
        (0, logEvents_1.logEvents)(`${req.method}\t${req.headers.origin}\t${req.url}\t${err.name}: ${err.message}`, dateToday + "=" + "errLog.txt");
        res.status(500).json({ error: err.message });
    }
}
exports.default = errorHandler;
//# sourceMappingURL=errorHandler.js.map