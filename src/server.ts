import { Express, Request, Response } from "express";
import sessionSwagger from "./swagger/session.swagger";
import sessionRouter from "./routes/session.routes";

function server(app: Express) {
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

  sessionSwagger();
  app.use("/api", sessionRouter);
}

export default server;
