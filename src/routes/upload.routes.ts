import { Router } from "express";
import validateResource from "../middleware/validateResource";
import { uploadImageSchema } from "../schema/upload.schema";
import { uploadHandler } from "../controller/upload.controller";
import { uploadSingleImage } from "../middleware/upload.multer";

const uploadRouter: Router = Router();
uploadRouter.route("/upload-image").post(uploadSingleImage, uploadHandler);
// pending
//.post(validateResource(uploadImageSchema), uploadSingleImage, uploadHandler);

export default uploadRouter;
