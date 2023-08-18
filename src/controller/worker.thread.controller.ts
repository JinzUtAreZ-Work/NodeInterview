import { Request, Response, NextFunction } from "express";
import { init, get } from "../middleware/workerPool";
import { Worker } from "worker_threads";

export async function getWorkerThread(req: Request, res: Response) {
  const password = "This is a long password";
  let result = null;
  let workerPool = null;
  workerPool = await get();
  result = await workerPool.bcryptHash?.(password);
  res.send(result);
}

let counter = 0;
export async function checkCounter(req: Request, res: Response) {
  counter++;
  res.status(200).json({ counter });
}

export async function loopingWorkerThread(req: Request, res: Response) {
  //NOTE: absolute path needed as url
  const worker = new Worker("../NODE_INTERVIEW/src/threads/workerFunction1.ts");
  worker.on("message", (data) => {
    res.status(200).json({ total: data });
  });
}

// pending
// export async function workerEmployee(req: Request, res: Response) {
//   //NOTE: absolute path needed as url
//   const worker = new Worker("../NODE_INTERVIEW/src/threads/workerEmployee.ts");
//   worker.on("message", (data) => {
//     res.status(200).json({ total: data });
//   });
// }
