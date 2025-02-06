"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loopingWorkerThread = exports.checkCounter = exports.getWorkerThread = void 0;
const workerPool_1 = require("../middleware/workerPool");
const worker_threads_1 = require("worker_threads");
async function getWorkerThread(req, res) {
    var _a;
    const password = "This is a long password";
    let result = null;
    let workerPool = null;
    workerPool = await (0, workerPool_1.get)();
    result = await ((_a = workerPool.bcryptHash) === null || _a === void 0 ? void 0 : _a.call(workerPool, password));
    res.send(result);
}
exports.getWorkerThread = getWorkerThread;
let counter = 0;
async function checkCounter(req, res) {
    counter++;
    res.status(200).json({ counter });
}
exports.checkCounter = checkCounter;
async function loopingWorkerThread(req, res) {
    //NOTE: absolute path needed as url
    const worker = new worker_threads_1.Worker("../NODE_INTERVIEW/src/threads/workerFunction1.ts");
    worker.on("message", (data) => {
        res.status(200).json({ total: data });
    });
}
exports.loopingWorkerThread = loopingWorkerThread;
// pending
// export async function workerEmployee(req: Request, res: Response) {
//   //NOTE: absolute path needed as url
//   const worker = new Worker("../NODE_INTERVIEW/src/threads/workerEmployee.ts");
//   worker.on("message", (data) => {
//     res.status(200).json({ total: data });
//   });
// }
//# sourceMappingURL=worker.thread.controller.js.map