import { Router } from "express";

import {
  getWorkerThread,
  checkCounter,
  loopingWorkerThread,
  //workerEmployee,
} from "../controller/worker.thread.controller";

// query params is validated in schema used any
const workerThreadRouter: Router = Router();
workerThreadRouter.route("/bcrypt").get(getWorkerThread);

workerThreadRouter.route("/counter").get(checkCounter);

workerThreadRouter.route("/looping").get(loopingWorkerThread);

//pending
//workerThreadRouter.route("/employee").get(workerEmployee);
export default workerThreadRouter;
