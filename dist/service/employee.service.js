"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.streamAllemployees = exports.findAllEmployees = void 0;
const employees_model_1 = __importStar(require("../models/employees.model"));
async function findAllEmployees(query) {
    try {
        let { page, limit, sort, asc } = query;
        if (!page)
            page = 1;
        if (!limit)
            limit = 10;
        if (!sort)
            sort = "id";
        if (!asc)
            asc = -1;
        const skip = (page - 1) * 10;
        //console.log(sort, skip, limit);
        const employees = employees_model_1.default.find()
            .sort({ [sort]: asc })
            .skip(skip)
            .limit(limit);
        return employees;
    }
    catch (e) {
        throw e;
    }
}
exports.findAllEmployees = findAllEmployees;
function streamAllemployees(res) {
    const transformData = new employees_model_1.CustomTransform({ objectMode: true });
    transformData._transform = function (chunk, encoding, callback) {
        if (!this.isWritten) {
            this.isWritten = true;
            callback(null, "[" + JSON.stringify(chunk));
        }
        else {
            callback(null, "," + JSON.stringify(chunk));
        }
    };
    transformData._flush = function (callback) {
        callback(null, "]");
    };
    const employees = employees_model_1.default.find().cursor().pipe(transformData);
    return employees;
}
exports.streamAllemployees = streamAllemployees;
//# sourceMappingURL=employee.service.js.map