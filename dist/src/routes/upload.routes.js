"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_controller_1 = require("../controller/upload.controller");
const upload_multer_1 = require("../middleware/upload.multer");
const uploadRouter = (0, express_1.Router)();
uploadRouter.route("/upload-image").post(upload_multer_1.uploadSingleImage, upload_controller_1.uploadHandler);
// pending
//.post(validateResource(uploadImageSchema), uploadSingleImage, uploadHandler);
exports.default = uploadRouter;
//# sourceMappingURL=upload.routes.js.map