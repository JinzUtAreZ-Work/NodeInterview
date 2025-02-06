import { logEvents } from "./logEvents";
import { Request, Response, NextFunction } from "express";
import moment from "moment";

const dateToday = moment().format(moment.HTML5_FMT.DATE);

export default function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("errorhandler", err.name, req.statusCode);
  if (err.name && err.message) {
    process.on("uncaughtException", (error) => {
      console.error("Uncaught Exception:", error);
      // Perform cleanup and exit process if necessary
    });
    process.on("unhandledRejection", (reason, promise) => {
      console.error("Unhandled Rejection at:", promise, "reason:", reason);
      // Perform cleanup and exit process if necessary
    });
    logEvents(
      `${req.method}\t${req.headers?.origin}\t${req.url}\t${err.name}: ${err.message}`,
      dateToday + "=" + "errLog.txt"
    );

    res.status(500).json({ error: err.message });
  }
  next();
}
