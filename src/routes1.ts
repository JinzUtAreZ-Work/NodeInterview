import { Express, Request, Response } from "express";

import {
  createUserSessionHandler,
  getUserSessionsHandler,
} from "./controller/session.controller";
import { createUserHandler } from "./controller/user.controller";
import validateResource from "./middleware/validateResource";
import { createSessionSchema } from "./schema/session.schema";
import { createUserSchema } from "./schema/user.schema";
import requireUser from "./middleware/requireUser";

import ses from "./api/session";

function routes(app: Express) {
  /**
   * @openapi
   * /healthcheck:
   *  get:
   *    tags:
   *    - Healthcheck
   *    description: Responds if app is up and running
   *    responses:
   *      200:
   *        description: App is up and running
   */

  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  /**
   * @openapi
   * '/api/users':
   *  post:
   *     tags:
   *     - User
   *     summary: Register a user
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateUserInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateUserResponse'
   *      400:
   *        description: Bad Request
   *      409:
   *        description: Conflict
   */
  app.post("/api/users", validateResource(createUserSchema), createUserHandler);

  /**
   * @openapi
   * '/api/sessions':
   *  post:
   *     tags:
   *     - Session
   *     summary: Create user session
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateSessionInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateSessionResponse'
   *      401:
   *        description: Unauthorized
   */

  app.post(
    "/api/sessions",
    validateResource(createSessionSchema),
    createUserSessionHandler
  );

  /**
   * @openapi
   * security:
   *   - bearerAuth: []
   * components:
   *   securitySchemes:
   *     bearerAuth:
   *       type: http
   *       scheme: bearer
   *       bearerFormat: JWT
   * '/api/sessions':
   *  get:
   *    tags:
   *    - Session:
   *    summary: Retrieve list of access tokens and refresh tokens
   *    responses:
   *     200:
   *       description: Success
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/GetSessionResponse'
   *     403:
   *       description: Forbidden
   */
  //PENDING
  app.get("/api/sessions", requireUser, getUserSessionsHandler);

  app.use("/api", ses);
}

export default routes;
