import { object, number, string, TypeOf, z } from "zod";

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
  .refine(
    (schema) => (schema.asc === "1" || schema.asc === "-1" ? true : false),
    {
      message: "Invalid ascending order",
    }
  )
  .refine((schema) => (isNaN(schema.page) === true ? false : true), {
    message: "Invalid page number",
  });
//.transform((order) => parseInt(order))

export const getAllEmployeeSchema = object({
  query,
});

export type GetAllEmployeeInput = TypeOf<typeof getAllEmployeeSchema>;
