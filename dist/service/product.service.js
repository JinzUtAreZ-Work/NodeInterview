"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bulkCreateProduct = exports.deleteProduct = exports.findAndUpdateProduct = exports.findProduct = exports.createProduct = void 0;
const product_model_1 = __importDefault(require("../models/product.model"));
async function createProduct(input) {
    try {
        const result = product_model_1.default.create(input);
        return result;
    }
    catch (e) {
        //console.log("error", e);
        throw e;
    }
}
exports.createProduct = createProduct;
async function findProduct(query, options = { lean: true }) {
    try {
        //console.log(query, options);
        const result = product_model_1.default.findOne(query, {}, options);
        return result;
    }
    catch (e) {
        throw e;
    }
}
exports.findProduct = findProduct;
async function findAndUpdateProduct(query, update, options) {
    return product_model_1.default.findOneAndUpdate(query, update, options);
}
exports.findAndUpdateProduct = findAndUpdateProduct;
async function deleteProduct(query) {
    return product_model_1.default.deleteOne(query);
}
exports.deleteProduct = deleteProduct;
async function bulkCreateProduct(input) {
    try {
        const result = product_model_1.default.insertMany(input);
        return result;
    }
    catch (e) {
        //console.log("error", e);
        throw e;
    }
}
exports.bulkCreateProduct = bulkCreateProduct;
//# sourceMappingURL=product.service.js.map