"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateResource_1 = __importDefault(require("../middleware/validateResource"));
const user_schema_1 = require("../schema/user.schema");
const user_controller_1 = require("../controller/user.controller");
const userRouter = (0, express_1.Router)();
userRouter
    .route("/users")
    .post((0, validateResource_1.default)(user_schema_1.createUserSchema), user_controller_1.createUserHandler);
exports.default = userRouter;
//# sourceMappingURL=user.routes.js.map