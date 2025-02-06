"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomTransform = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const stream_1 = require("stream");
class CustomTransform extends stream_1.Transform {
    constructor() {
        super(...arguments);
        this.isWritten = false;
    }
}
exports.CustomTransform = CustomTransform;
const employeeSchema = new mongoose_1.default.Schema({
    id: {
        type: Number,
        required: true,
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    About: { type: String, required: true },
    token: { type: String, required: true },
    country: { type: String, required: true },
    location: { type: String, required: true },
    lng: { type: Number, required: true },
    lat: { type: Number, required: true },
    dob: { type: String, required: true },
    gender: { type: Number, required: true },
    userType: { type: Number, required: true },
    userStatus: { type: Number, required: true },
    profilePicture: { type: String, required: true },
    coverPicture: { type: String, required: true },
    enablefollowme: { type: Boolean, required: true },
    sendmenotifications: { type: Boolean, required: true },
    sendTextmessages: { type: Boolean, required: true },
    enabletagging: { type: Boolean, required: true },
    livelng: { type: Number, required: true },
    livelat: { type: Number, required: true },
    liveLocation: { type: String, required: true },
    creditBalance: { type: Number, required: true },
    myCash: { type: Number, required: true },
}, {
    timestamps: true,
});
const EmployeeModel = mongoose_1.default.model("Employee", employeeSchema);
exports.default = EmployeeModel;
//# sourceMappingURL=employees.model.js.map