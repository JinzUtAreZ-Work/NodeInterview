import { object, string, TypeOf, z } from "zod";

// all req.query are string values
const query = z
  .object({
    page: string({
      required_error: "Page is required",
    }).transform((order) => parseInt(order)),
    limit: string({
      required_error: "Limit is required",
    }),
    sort: string().optional(),
    asc: string().optional(),
  })
  .refine((schema) => (ascSchema(schema.asc) ? true : false), {
    message: "Invalid ascending order",
  })
  .refine((schema) => (isNaN(schema.page) === true ? false : true), {
    message: "Invalid page number",
  });
//.transform((order) => parseInt(order))

function ascSchema(asc: string | undefined) {
  if (!asc) return true;

  if (asc === "1" || asc === "-1") return true;
  return false;
}

export const getAllEmployeeSchema = object({
  query,
});

// export interface queryString {
//   [key: string]: string | string[] | undefined;
// }

export type GetAllEmployeeInput = TypeOf<typeof getAllEmployeeSchema>;
