// @ts-nocheck
import { Request, Response, NextFunction } from "express";
import config from "config";
//const allowedOrigins = require("../config/allowedOrigins");

export const credentials = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //   console.log("request", req.headers);
  //   console.log("response", res.header);
  const origin = req.headers.origin;

  const allowedOrigins: string[] = config.get("allowedOrigins");
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

export default credentials;
