import { Express, Router } from "express";
import {
  createUserSessionHandler,
  getUserSessionsHandler,
} from "../controller/session.controller";
import validateResource from "../middleware/validateResource";
import { createSessionSchema } from "../schema/session.schema";
import requireUser from "../middleware/requireUser";

const sessionRouter: Router = Router();
sessionRouter
  .route("/sessions")
  .post(validateResource(createSessionSchema), createUserSessionHandler)
  .get(requireUser, getUserSessionsHandler);

export default sessionRouter;
