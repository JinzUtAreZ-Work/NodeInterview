"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.workerGetAllEmployee = void 0;
const employee_service_1 = require("../service/employee.service");
async function workerGetAllEmployee(req, res) {
    const query = req.query;
    console.log("employee worker", query);
    const employees = await (0, employee_service_1.findAllEmployees)(query);
    if (!employees) {
        return res.status(404).json({ error: "Employees records empty" });
    }
    return res.send(employees);
}
exports.workerGetAllEmployee = workerGetAllEmployee;
//# sourceMappingURL=workerEmployee.js.map