import { Router } from "express";
import validateResource from "../middleware/validateResource";
import { getAllEmployeeSchema } from "../schema/employee.schema";
import { getAllEmployeeHandler } from "../controller/employee.controller";

const employeeRouter: Router = Router();
employeeRouter
  .route("/")
  .get(validateResource(getAllEmployeeSchema), getAllEmployeeHandler);

export default employeeRouter;
