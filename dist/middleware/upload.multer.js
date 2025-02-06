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
exports.uploadSingleImage = exports.upload = exports.fileFilter = exports.fileStorage = void 0;
const multer_1 = __importStar(require("multer"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
exports.fileStorage = multer_1.default.diskStorage({
    destination: (request, file, callback) => {
        if (!fs.existsSync(path.join(__dirname, "..", "images"))) {
            const fileStorageError = new Error("Storage folder not found");
            callback(fileStorageError, path.join(__dirname, "..", "images"));
        }
        else {
            callback(null, path.join(__dirname, "..", "images"));
        }
    },
    filename: (req, file, callback) => {
        const uniqueSuffix = Date.now();
        callback(null, uniqueSuffix + file.originalname);
    },
});
const fileFilter = (request, file, callback) => {
    if (file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg") {
        callback(null, true);
    }
    else {
        const fileValidationError = new Error("Forbidden extension");
        callback(fileValidationError, false);
    }
};
exports.fileFilter = fileFilter;
const imageSize = 100000000;
exports.upload = (0, multer_1.default)({
    storage: exports.fileStorage,
    limits: {
        fileSize: imageSize,
    },
    fileFilter: exports.fileFilter,
});
function uploadSingleImage(req, res, next) {
    exports.upload.single("image")(req, res, function (err) {
        console.log("upload-error", err);
        if (err instanceof multer_1.MulterError) {
            // Handle Multer-related errors
            if (err.code === "LIMIT_FILE_SIZE") {
                return res.status(400).json({ error: "File size too large" });
            }
            else if (err.code === "LIMIT_UNEXPECTED_FILE") {
                return res.status(400).json({ error: "Unexpected field" });
            }
            else {
                return res.status(500).json({ error: "File upload failed" });
            }
        }
        else if (err) {
            // Handle other errors
            return res.status(500).json({ error: err.message });
        }
        else {
            //return res.status(200).json({ message: "File uploaded successfully" });
            next();
        }
    });
}
exports.uploadSingleImage = uploadSingleImage;
//# sourceMappingURL=upload.multer.js.map