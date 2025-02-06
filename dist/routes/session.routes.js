"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const session_controller_1 = require("../controller/session.controller");
const validateResource_1 = __importDefault(require("../middleware/validateResource"));
const session_schema_1 = require("../schema/session.schema");
const requireUser_1 = __importDefault(require("../middleware/requireUser"));
const sessionRouter = (0, express_1.Router)();
sessionRouter
    .route("/sessions")
    .post((0, validateResource_1.default)(session_schema_1.createSessionSchema), session_controller_1.createUserSessionHandler)
    .get(requireUser_1.default, session_controller_1.getUserSessionsHandler);
exports.default = sessionRouter;
//# sourceMappingURL=session.routes.js.map