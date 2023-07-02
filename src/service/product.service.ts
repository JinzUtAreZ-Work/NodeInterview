import ProductModel, {
  ProductDocument,
  ProductInput,
} from "../models/product.model";
import { FilterQuery, UpdateQuery, QueryOptions } from "mongoose";

export async function createProduct(input: ProductInput) {
  try {
    const result = ProductModel.create(input);
    return result;
  } catch (e) {
    console.log("error", e);
    throw e;
  }
}

export async function findProduct(
  query: FilterQuery<ProductDocument>,
  options: QueryOptions = { lean: true }
) {
  try {
    //console.log(query, options);
    const result = ProductModel.findOne(query, {}, options);
    return result;
  } catch (e) {
    throw e;
  }
}

export async function findAndUpdateProduct(
  query: FilterQuery<ProductDocument>,
  update: UpdateQuery<ProductDocument>,
  options: QueryOptions
) {
  return ProductModel.findOneAndUpdate(query, update, options);
}

export async function deleteProduct(query: FilterQuery<ProductDocument>) {
  return ProductModel.deleteOne(query);
}
