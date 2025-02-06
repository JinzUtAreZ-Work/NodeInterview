"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productPayload = void 0;
const mongodb_memory_server_1 = require("mongodb-memory-server");
const server_1 = __importDefault(require("../server"));
const supertest_1 = __importDefault(require("supertest"));
const mongoose_1 = __importDefault(require("mongoose"));
const product_service_1 = require("../service/product.service");
const jwt_utils_1 = require("../utils/jwt.utils");
const app = (0, server_1.default)();
const userId = new mongoose_1.default.Types.ObjectId().toString();
exports.productPayload = {
    user: userId,
    title: "Canon EOS 1500D DSLR Camera with 18-55mm Lens",
    description: "Designed for first-time DSLR owners who want impressive results straight out of the box, capture those magic moments no matter your level with the EOS 1500D. With easy to use automatic shooting modes, large 24.1 MP sensor, Canon Camera Connect app integration and built-in feature guide, EOS 1500D is always ready to go.",
    price: 879.99,
    image: "https://i.imgur.com/QlRphfQ.jpg",
};
const userPayload = {
    email: "test2@example.com",
    name: "Jane Doe1",
    _id: new mongoose_1.default.Types.ObjectId().toString(),
    createdAt: "2021-09-30T13:31:07.674Z",
    updatedAt: "2021-09-30T13:31:07.674Z",
    __v: 0,
};
describe("product", () => {
    beforeAll(async () => {
        const mongoServer = await mongodb_memory_server_1.MongoMemoryServer.create();
        await mongoose_1.default.connect(mongoServer.getUri());
    });
    afterAll(async () => {
        await mongoose_1.default.disconnect();
        await mongoose_1.default.connection.close();
    });
    describe("get product route", () => {
        describe("given the product does not exist", () => {
            it("should return a 404", async () => {
                const productId = "product-123";
                await (0, supertest_1.default)(app).get(`/api/products/${productId}`).expect(404);
            });
        });
        describe("given the product does exist", () => {
            it("should return a 200 status and the product", async () => {
                //@ts-ignore
                const product = await (0, product_service_1.createProduct)(exports.productPayload);
                const { body, statusCode } = await (0, supertest_1.default)(app).get(`/api/products/${product.productId}`);
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
                const { statusCode } = await (0, supertest_1.default)(app).post(`/api/products`);
                expect(statusCode).toBe(403);
            });
        });
        describe("given the user is logged in", () => {
            it("should return a 200 and create the product", async () => {
                const jwt = (0, jwt_utils_1.signJwt)(userPayload, "accessTokenPrivateKey");
                const { statusCode, body } = await (0, supertest_1.default)(app)
                    .post(`/api/products`)
                    .set("Authorization", `Bearer ${jwt}`)
                    .send(exports.productPayload);
                console.log(jwt, body);
                expect(statusCode).toBe(200);
                expect(body).toEqual({
                    user: expect.any(String),
                    title: "Canon EOS 1500D DSLR Camera with 18-55mm Lens",
                    description: "Designed for first-time DSLR owners who want impressive results straight out of the box, capture those magic moments no matter your level with the EOS 1500D. With easy to use automatic shooting modes, large 24.1 MP sensor, Canon Camera Connect app integration and built-in feature guide, EOS 1500D is always ready to go.",
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
//# sourceMappingURL=product.test.js.map