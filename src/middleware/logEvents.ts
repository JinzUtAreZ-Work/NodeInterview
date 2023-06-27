// @ts-nocheck

import { Request, Response, NextFunction } from "express";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import * as fs from "fs";
import { promises as fsPromises } from "fs";
import * as path from "path";

const dateToday = moment().format(moment.HTML5_FMT.DATE);

export const logEvents = async (message: string, logName: string) => {
  const dateTime = `${moment().format("MMMM Do YYYY, h:mm:ss a")}`;
  const logItem = `${dateTime}\t${uuidv4()}\t${message}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }

    // const fileExist = await findByName("logs", "reqLog").then((files) => {
    //   //console.log("checkfiles", files);
    //   return files;
    // });
    // console.log("checkfiles", fileExist);

    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", logName),
      logItem
    );
  } catch (err) {
    console.error("logEvents", err);
  }
};

export const loggingEvents = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logEvents(
    `${req.method}\t${req.headers.origin}\t${req.url}`,
    dateToday + "=" + "reqLog.txt"
  );
  console.log(`${req.method} ${req.path}`);
  next();
};

const findByName = async (dir: any, name: string) => {
  const matchedFiles = [];
  const files = await fsPromises.readdir(path.join(__dirname, "..", dir));
  for (const file of files) {
    const filename = path.parse(file).name;
    const logDate = filename.split("=");
    //console.log("files", filename, name, logDate, String(dateToday));
    if (logDate[0] === String(dateToday) && logDate[1] === name) {
      matchedFiles.push({ file: file, date: logDate[0] });
    }
  }
  //console.log("files", matchedFiles);
  return matchedFiles;
};
