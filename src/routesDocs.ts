import { Express, Request, Response } from "express";
import sessionSwagger from "./swagger/1_session.swagger";
import productSwagger from "./swagger/product.swagger";
import sessionRouter from "./routes/session.routes";
import userRouter from "./routes/user.routes";
import productRouter from "./routes/product.routes";
import employeeRouter from "./routes/employee.routes";
import uploadRouter from "./routes/upload.routes";
import workerThreadRouter from "./routes/worker.thread.routes";

function routesDocs(app: Express) {
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
  app.use("/api", userRouter);
  sessionSwagger();
  app.use("/api", sessionRouter);
  productSwagger();
  app.use("/api/products", productRouter);
  app.use("/api/employee", employeeRouter);
  app.use("/api/uploader", uploadRouter);
  app.use("/api/workerthread", workerThreadRouter);
}

export default routesDocs;
