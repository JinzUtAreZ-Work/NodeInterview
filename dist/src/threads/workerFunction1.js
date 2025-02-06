"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const worker_threads_1 = require("worker_threads");
let total = 0;
for (let i = 0; i < 10000000000; i++) {
    total++;
}
worker_threads_1.parentPort === null || worker_threads_1.parentPort === void 0 ? void 0 : worker_threads_1.parentPort.postMessage(total);
//# sourceMappingURL=workerFunction1.js.map