import { logEvents } from "./logEvents";
import { Request, Response, NextFunction } from "express";

export default function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err) {
    logEvents(
      `${req.method}\t${req.headers.origin}\t${req.url}\t${err.name}: ${err.message}`,
      "errLog.txt"
    );
    console.error("errorhandler", err.stack);
    res.status(500).json({ error: err.message });
  }
  //next();
}
