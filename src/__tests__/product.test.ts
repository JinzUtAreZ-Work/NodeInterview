import { MongoMemoryServer } from "mongodb-memory-server";
import server from "../server";
import supertest from "supertest";
import mongoose from "mongoose";
import { createProduct } from "../service/product.service";
import { signJwt } from "../utils/jwt.utils";

const app = server();
const userId = new mongoose.Types.ObjectId().toString();

export const productPayload = {
  user: userId,
  title: "Canon EOS 1500D DSLR Camera with 18-55mm Lens",
  description:
    "Designed for first-time DSLR owners who want impressive results straight out of the box, capture those magic moments no matter your level with the EOS 1500D. With easy to use automatic shooting modes, large 24.1 MP sensor, Canon Camera Connect app integration and built-in feature guide, EOS 1500D is always ready to go.",
  price: 879.99,
  image: "https://i.imgur.com/QlRphfQ.jpg",
};

const userPayload = {
  email: "test2@example.com",
  name: "Jane Doe1",
  _id: new mongoose.Types.ObjectId().toString(),
  createdAt: "2021-09-30T13:31:07.674Z",
  updatedAt: "2021-09-30T13:31:07.674Z",
  __v: 0,
};

describe("product", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe("get product route", () => {
    describe("given the product does not exist", () => {
      it("should return a 404", async () => {
        const productId = "product-123";
        await supertest(app).get(`/api/products/${productId}`).expect(404);
      });
    });

    describe("given the product does exist", () => {
      it("should return a 200 status and the product", async () => {
        //@ts-ignore
        const product = await createProduct(productPayload);

        const { body, statusCode } = await supertest(app).get(
          `/api/products/${product.productId}`
        );
        console.log(body, statusCode);
        expect(statusCode).toBe(200);
        expect(body.productId).toBe(product.productId);
      });
    });
  });

  describe("create a product", () => {
    describe("given the user is not logged in", () => {
      it("should return 403", async () => {
        //@ts-ignore
        const { statusCode } = await supertest(app).post(`/api/products`);

        expect(statusCode).toBe(403);
      });
    });

    describe("given the user is logged in", () => {
      it("should return a 200 and create the product", async () => {
        const jwt = signJwt(userPayload, "accessTokenPrivateKey");
        const { statusCode, body } = await supertest(app)
          .post(`/api/products`)
          .set("Authorization", `Bearer ${jwt}`)
          .send(productPayload);
        console.log(jwt, body);
        expect(statusCode).toBe(200);

        expect(body).toEqual({
          user: expect.any(String),
          title: "Canon EOS 1500D DSLR Camera with 18-55mm Lens",
          description:
            "Designed for first-time DSLR owners who want impressive results straight out of the box, capture those magic moments no matter your level with the EOS 1500D. With easy to use automatic shooting modes, large 24.1 MP sensor, Canon Camera Connect app integration and built-in feature guide, EOS 1500D is always ready to go.",
          price: 879.99,
          image: "https://i.imgur.com/QlRphfQ.jpg",
          _id: expect.any(String),
          productId: expect.any(String),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          __v: 0,
        });
      });
    });
  });
});
