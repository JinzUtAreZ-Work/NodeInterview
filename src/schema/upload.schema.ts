import { object, z, array } from "zod";

// export const uploadImageSchema = object({
//   body: object({
//     Image: buffer({
//       required_error: "Image is required",
//     }),
//   }),
// });

const MAX_FILE_SIZE = 500000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const uploadImageSchema = object({
  body: object({
    image: object({
      size: z.number({ required_error: "Size is required" }),
    }).array(),

    // image: z
    //   .any()
    //   .refine(
    //     (file) => file?.size <= MAX_FILE_SIZE,
    //     `Max image size is 500MB.`
    //   ),
    //.refine((file) => console.log("zod", file)),
    //   .refine(
    //     (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
    //     "Only .jpg, .jpeg, .png and .webp formats are supported."
    //   ),
  }),
});

// const uploadImageSchemas = z.array(uploadImageSchema);

// export const uploadImageSchema = z.object({
//   image: z
//     .any()
//     .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 500MB.`)
//     //.refine((file) => console.log("zod", file?.size, file))
//     .refine(
//       (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
//       "Only .jpg, .jpeg, .png and .webp formats are supported."
//     ),
// });
