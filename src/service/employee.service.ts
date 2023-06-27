import EmployeeModel, { EmployeeDocument } from "../models/employees.model";
import { FilterQuery } from "mongoose";

export async function findAllEmployees(query: FilterQuery<EmployeeDocument>) {
  try {
    console.log(query);
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
