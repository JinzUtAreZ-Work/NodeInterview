"use strict";
// @ts-nocheck
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggingEvents = exports.logEvents = void 0;
const moment_1 = __importDefault(require("moment"));
const uuid_1 = require("uuid");
const fs = __importStar(require("fs"));
const fs_1 = require("fs");
const path = __importStar(require("path"));
const dateToday = (0, moment_1.default)().format(moment_1.default.HTML5_FMT.DATE);
const logEvents = async (message, logName) => {
    const dateTime = `${(0, moment_1.default)().format("MMMM Do YYYY, h:mm:ss a")}`;
    const logItem = `${dateTime}\t${(0, uuid_1.v4)()}\t${message}\n`;
    try {
        if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
            await fs_1.promises.mkdir(path.join(__dirname, "..", "logs"));
        }
        // const fileExist = await findByName("logs", "reqLog").then((files) => {
        //   //console.log("checkfiles", files);
        //   return files;
        // });
        // console.log("checkfiles", fileExist);
        await fs_1.promises.appendFile(path.join(__dirname, "..", "logs", logName), logItem);
    }
    catch (err) {
        console.error("logEvents", err);
    }
};
exports.logEvents = logEvents;
const loggingEvents = (req, res, next) => {
    //console.log(`${req.method} ${req.path}`);
    (0, exports.logEvents)(`${req.method}\t${req.headers.origin}\t${req.url}`, dateToday + "=" + "reqLog.txt");
    next();
};
exports.loggingEvents = loggingEvents;
// const findByName = async (dir: any, name: string) => {
//   const matchedFiles = [];
//   const files = await fsPromises.readdir(path.join(__dirname, "..", dir));
//   for (const file of files) {
//     const filename = path.parse(file).name;
//     const logDate = filename.split("=");
//     //console.log("files", filename, name, logDate, String(dateToday));
//     if (logDate[0] === String(dateToday) && logDate[1] === name) {
//       matchedFiles.push({ file: file, date: logDate[0] });
//     }
//   }
//   //console.log("files", matchedFiles);
//   return matchedFiles;
// };
//# sourceMappingURL=logEvents.js.map