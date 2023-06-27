import { Router } from "express";
import validateResource from "../middleware/validateResource";
import { getAllEmployeeSchema } from "../schema/employee.schema";
import { getAllEmployeeHandler } from "../controller/employee.controller";

// query params is validated in schema used any
const employeeRouter: Router = Router();
employeeRouter
  .route("/")
  .get(validateResource(getAllEmployeeSchema), getAllEmployeeHandler as any);

export default employeeRouter;
