"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.streamAllEmployeeHandler = exports.getAllEmployeeHandler = void 0;
const employee_service_1 = require("../service/employee.service");
const stream_1 = require("stream");
async function getAllEmployeeHandler(req, res) {
    const query = req.query;
    //console.log(query);
    const employees = await (0, employee_service_1.findAllEmployees)(query);
    if (!employees) {
        return res.status(404).json({ error: "Employees records empty" });
    }
    return res.send(employees);
}
exports.getAllEmployeeHandler = getAllEmployeeHandler;
class CustomTransform extends stream_1.Transform {
    constructor() {
        super(...arguments);
        this.isWritten = false;
    }
}
function streamAllEmployeeHandler(req, res, next) {
    try {
        const employees = (0, employee_service_1.streamAllemployees)(res);
        employees
            .on("data", (chunk) => {
            let canWrite = res.write(chunk);
            if (!canWrite) {
                employees.pause();
                res.once("drain", () => employees.resume());
            }
        })
            .on("error", function () {
            res.status(404).json({ error: "Employees records empty" }).end();
        });
        employees.on("end", () => {
            res.end();
        });
        return res.send;
    }
    catch (e) {
        return res.status(409).send(e.message);
    }
}
exports.streamAllEmployeeHandler = streamAllEmployeeHandler;
//# sourceMappingURL=employee.controller.js.map