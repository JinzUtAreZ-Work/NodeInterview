import { Express, Router } from "express";
import {
  createProductHandler,
  getProductHandler,
  updateProductHandler,
  deleteProductHandler,
} from "../controller/product.controller";
import validateResource from "../middleware/validateResource";
import requireUser from "../middleware/requireUser";
import {
  createProductSchema,
  getProductSchema,
  updateProductSchema,
  deleteProductSchema,
} from "../schema/product.schema";

const productRouter: Router = Router();
productRouter
  .route("/:productId")
  .get(validateResource(getProductSchema), getProductHandler)
  .put(
    [requireUser, validateResource(updateProductSchema)],
    updateProductHandler
  )
  .delete([
    requireUser,
    validateResource(deleteProductSchema),
    deleteProductHandler,
  ]);

productRouter
  .route("/")
  .post(
    [requireUser, validateResource(createProductSchema)],
    createProductHandler
  );

export default productRouter;
