import { Request, Response } from "express";
import { GetAllEmployeeInput } from "../schema/employee.schema";
import {
  findAllEmployees,
  streamAllemployees,
} from "../service/employee.service";
import EmployeeModel, { EmployeeDocument } from "../models/employees.model";
import { Transform } from "stream";

export async function getAllEmployeeHandler(
  req: Request<{}, {}, {}, GetAllEmployeeInput>,
  res: Response
) {
  const query = req.query;
  //console.log(query);
  const employees = await findAllEmployees(query);

  if (!employees) {
    return res.status(404).json({ error: "Employees records empty" });
  }
  return res.send(employees);
}

class CustomTransform extends Transform {
  isWritten = false;
}

export function streamAllEmployeeHandler(req: Request, res: Response) {
  const employees = streamAllemployees(res);

  employees
    .on("data", (chunk: EmployeeDocument) => {
      let canWrite = res.write(chunk);
      if (!canWrite) {
        employees.pause();
        res.once("drain", () => employees.resume());
      }
    })
    .on("error", function () {
      res.status(404).json({ error: "Employees records empty" }).end();
    });

  employees.on("end", () => {
    res.end();
  });
  return res.send;
}
