import mongoose from "mongoose";
import { Transform } from "stream";
export class CustomTransform extends Transform {
  isWritten = false;
}
export interface EmployeeInput {
  name: String;
  email: String;
  password: String;
  About: String;
  token: String;
  country: String;
  location: String;
  lng: Number;
  lat: Number;
  dob: String;
  gender: Number;
  userType: Number;
  userStatus: Number;
  profilePicture: String;
  coverPicture: String;
  enablefollowme: Boolean;
  sendmenotifications: Boolean;
  sendTextmessages: Boolean;
  enabletagging: Boolean;
  livelng: Number;
  livelat: Number;
  liveLocation: String;
  creditBalance: Number;
  myCash: Number;
}

export interface EmployeeDocument extends EmployeeInput, mongoose.Document {
  id: Number;
  createdAt: Date;
  updatedAt: Date;
}

const employeeSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

const EmployeeModel = mongoose.model<EmployeeDocument>(
  "Employee",
  employeeSchema
);

export default EmployeeModel;
