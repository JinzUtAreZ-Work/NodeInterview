import { Router } from "express";
import validateResource from "../middleware/validateResource";
import { getAllEmployeeSchema } from "../schema/employee.schema";
import {
  getAllEmployeeHandler,
  streamAllEmployeeHandler,
} from "../controller/employee.controller";

// query params is validated in schema used any
const employeeRouter: Router = Router();
employeeRouter
  .route("/")
  .get(validateResource(getAllEmployeeSchema), getAllEmployeeHandler as any);

employeeRouter.route("/stream").get(streamAllEmployeeHandler);

export default employeeRouter;
