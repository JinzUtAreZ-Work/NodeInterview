import { logEvents } from "./logEvents";
import { Request, Response, NextFunction } from "express";
import moment from "moment";

const dateToday = moment().format(moment.HTML5_FMT.DATE);

export default function errorHandler(err: Error, req: Request, res: Response) {
  console.error("errorhandler", err.name, err.message);
  if (err) {
    logEvents(
      `${req.method}\t${req.headers.origin}\t${req.url}\t${err.name}: ${err.message}`,
      dateToday + "=" + "errLog.txt"
    );

    res.status(500).json({ error: err.message });
  }
}
