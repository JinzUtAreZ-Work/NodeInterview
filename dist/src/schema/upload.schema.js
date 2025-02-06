"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImageSchema = void 0;
const zod_1 = require("zod");
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
exports.uploadImageSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        image: (0, zod_1.object)({
            size: zod_1.z.number({ required_error: "Size is required" }),
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
//# sourceMappingURL=upload.schema.js.map