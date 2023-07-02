import EmployeeModel, {
  EmployeeDocument,
  CustomTransform,
} from "../models/employees.model";
import { FilterQuery } from "mongoose";

export async function findAllEmployees(query: FilterQuery<EmployeeDocument>) {
  try {
    let { page, limit, sort, asc } = query;
    if (!page) page = 1;
    if (!limit) limit = 10;
    if (!sort) sort = "id";
    if (!asc) asc = -1;
    const skip = (page - 1) * 10;

    const employees = EmployeeModel.find()
      .sort({ [sort]: asc })
      .skip(skip)
      .limit(limit);

    return employees;
  } catch (e) {
    throw e;
  }
}

export function streamAllemployees(res: any) {
  const transformData = new CustomTransform({ objectMode: true });

  transformData._transform = function (
    chunk: EmployeeDocument,
    encoding: string,
    callback: any
  ) {
    if (!this.isWritten) {
      this.isWritten = true;
      callback(null, "[" + JSON.stringify(chunk));
    } else {
      callback(null, "," + JSON.stringify(chunk));
    }
  };

  transformData._flush = function (callback: any) {
    callback(null, "]");
  };

  const employees = EmployeeModel.find().cursor().pipe(transformData);

  return employees;
}
