"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("../controller/product.controller");
const validateResource_1 = __importDefault(require("../middleware/validateResource"));
const requireUser_1 = __importDefault(require("../middleware/requireUser"));
const product_schema_1 = require("../schema/product.schema");
const productRouter = (0, express_1.Router)();
productRouter
    .route("/:productId")
    .get((0, validateResource_1.default)(product_schema_1.getProductSchema), product_controller_1.getProductHandler)
    .put([requireUser_1.default, (0, validateResource_1.default)(product_schema_1.updateProductSchema)], product_controller_1.updateProductHandler)
    .delete([
    requireUser_1.default,
    (0, validateResource_1.default)(product_schema_1.deleteProductSchema),
    product_controller_1.deleteProductHandler,
]);
productRouter
    .route("/")
    .post([requireUser_1.default, (0, validateResource_1.default)(product_schema_1.createProductSchema)], product_controller_1.createProductHandler);
exports.default = productRouter;
//# sourceMappingURL=product.routes.js.map