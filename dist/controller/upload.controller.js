"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadHandler = void 0;
const upload_model_1 = __importDefault(require("../models/upload.model"));
async function uploadHandler(req, res) {
    var _a;
    const filename = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
    //console.log("upload", filename);
    try {
        await upload_model_1.default.create({ image: filename });
        return res.status(200).json({ message: "File uploaded successfully" });
    }
    catch (error) {
        console.error("error", error);
        return res.status(500).json({ error: "Uploading error" });
    }
}
exports.uploadHandler = uploadHandler;
//# sourceMappingURL=upload.controller.js.map