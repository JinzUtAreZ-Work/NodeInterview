"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateResource_1 = __importDefault(require("../middleware/validateResource"));
const employee_schema_1 = require("../schema/employee.schema");
const employee_controller_1 = require("../controller/employee.controller");
const requireUser_1 = __importDefault(require("../middleware/requireUser"));
// query params is validated in schema used any
const employeeRouter = (0, express_1.Router)();
employeeRouter
    .route("/")
    .get((0, validateResource_1.default)(employee_schema_1.getAllEmployeeSchema), employee_controller_1.getAllEmployeeHandler);
employeeRouter.route("/stream").get(requireUser_1.default, employee_controller_1.streamAllEmployeeHandler);
exports.default = employeeRouter;
//# sourceMappingURL=employee.routes.js.map