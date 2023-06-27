import { Request, Response } from "express";
import { GetAllEmployeeInput } from "../schema/employee.schema";
import {
  findAllEmployees,
  streamAllEmployees,
} from "../service/employee.service";

export async function getAllEmployeeHandler(
  req: Request<{}, {}, {}, GetAllEmployeeInput>,
  res: Response
) {
  const query = req.query;
  const employees = await findAllEmployees(query);

  if (!employees) {
    return res.status(404).json({ error: "Employees records empty" });
  }
  return res.send(employees);
}
