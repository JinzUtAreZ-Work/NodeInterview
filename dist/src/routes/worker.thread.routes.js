"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const worker_thread_controller_1 = require("../controller/worker.thread.controller");
// query params is validated in schema used any
const workerThreadRouter = (0, express_1.Router)();
workerThreadRouter.route("/bcrypt").get(worker_thread_controller_1.getWorkerThread);
workerThreadRouter.route("/counter").get(worker_thread_controller_1.checkCounter);
workerThreadRouter.route("/looping").get(worker_thread_controller_1.loopingWorkerThread);
//pending
//workerThreadRouter.route("/employee").get(workerEmployee);
exports.default = workerThreadRouter;
//# sourceMappingURL=worker.thread.routes.js.map