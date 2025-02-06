"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const imageSchema = new mongoose_1.default.Schema({
    image: {
        type: String,
        required: true,
    },
    //image: { type: String, data: Buffer, required: true },
    //imageUrl: { type: String },
}, {
    timestamps: true,
});
const ImageDetailsModel = mongoose_1.default.model("ImageDetails", imageSchema);
exports.default = ImageDetailsModel;
//# sourceMappingURL=upload.model.js.map