"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllEmployeeSchema = void 0;
const zod_1 = require("zod");
// all req.query are string values
const query = zod_1.z
    .object({
    page: (0, zod_1.string)({
        required_error: "Page is required",
    }).transform((order) => parseInt(order)),
    limit: (0, zod_1.string)({
        required_error: "Limit is required",
    }),
    sort: (0, zod_1.string)().optional(),
    asc: (0, zod_1.string)().optional(),
})
    .refine((schema) => (ascSchema(schema.asc) ? true : false), {
    message: "Invalid ascending order",
})
    .refine((schema) => (isNaN(schema.page) === true ? false : true), {
    message: "Invalid page number",
});
//.transform((order) => parseInt(order))
function ascSchema(asc) {
    if (!asc)
        return true;
    if (asc === "1" || asc === "-1")
        return true;
    return false;
}
exports.getAllEmployeeSchema = (0, zod_1.object)({
    query,
});
//# sourceMappingURL=employee.schema.js.map