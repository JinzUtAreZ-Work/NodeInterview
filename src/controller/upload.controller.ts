import { Request, Response } from "express";
import ImageDetailsModel from "../models/upload.model";

export async function uploadHandler(req: Request, res: Response) {
  const filename = req.file?.filename;
  //console.log("upload", filename);

  try {
    await ImageDetailsModel.create({ image: filename });
    return res.status(200).json({ message: "File uploaded successfully" });
  } catch (error) {
    console.error("error", error);
    return res.status(500).json({ error: "Uploading error" });
  }
}
