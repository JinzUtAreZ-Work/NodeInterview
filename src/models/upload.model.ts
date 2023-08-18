import mongoose from "mongoose";

export interface ImgDetails {
  //image: Buffer;
  image: string;
}

const imageSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    //image: { type: String, data: Buffer, required: true },
    //imageUrl: { type: String },
  },
  {
    timestamps: true,
  }
);

const ImageDetailsModel = mongoose.model<ImgDetails>(
  "ImageDetails",
  imageSchema
);

export default ImageDetailsModel;
