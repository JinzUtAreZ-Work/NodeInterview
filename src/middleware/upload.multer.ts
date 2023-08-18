import { Request, Response, NextFunction, Errback } from "express";
import multer, { FileFilterCallback, Multer, MulterError } from "multer";
import * as path from "path";
import * as fs from "fs";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

export const fileStorage = multer.diskStorage({
  destination: (
    request: Request,
    file: Express.Multer.File,
    callback: DestinationCallback
  ): void => {
    if (!fs.existsSync(path.join(__dirname, "..", "images"))) {
      const fileStorageError = new Error("Storage folder not found") as any;
      callback(fileStorageError, path.join(__dirname, "..", "images"));
    } else {
      callback(null, path.join(__dirname, "..", "images"));
    }
  },

  filename: (
    req: Request,
    file: Express.Multer.File,
    callback: FileNameCallback
  ): void => {
    const uniqueSuffix = Date.now();
    callback(null, uniqueSuffix + file.originalname);
  },
});

export const fileFilter = (
  request: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
): void => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    callback(null, true);
  } else {
    const fileValidationError = new Error("Forbidden extension") as any;
    callback(fileValidationError, false);
  }
};

const imageSize = 100000000;

export const upload = multer({
  storage: fileStorage,
  limits: {
    fileSize: imageSize,
  },
  fileFilter: fileFilter,
});

export function uploadSingleImage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  upload.single("image")(req, res, function (err: any) {
    console.log("upload-error", err);
    if (err instanceof MulterError) {
      // Handle Multer-related errors
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ error: "File size too large" });
      } else if (err.code === "LIMIT_UNEXPECTED_FILE") {
        return res.status(400).json({ error: "Unexpected field" });
      } else {
        return res.status(500).json({ error: "File upload failed" });
      }
    } else if (err) {
      // Handle other errors
      return res.status(500).json({ error: err.message });
    } else {
      //return res.status(200).json({ message: "File uploaded successfully" });
      next();
    }
  });
}
