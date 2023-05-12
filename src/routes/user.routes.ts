import { Router } from "express";
import validateResource from "../middleware/validateResource";
import { createUserSchema } from "../schema/user.schema";
import { createUserHandler } from "../controller/user.controller";

const userRouter: Router = Router();
userRouter
  .route("/users")
  .post(validateResource(createUserSchema), createUserHandler);

export default userRouter;
