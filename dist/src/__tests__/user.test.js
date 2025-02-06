"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const UserService = __importStar(require("../service/user.service"));
const SessionService = __importStar(require("../service/session.service"));
const mongoose_1 = __importDefault(require("mongoose"));
const server_1 = __importDefault(require("../server"));
const session_controller_1 = require("../controller/session.controller");
const app = (0, server_1.default)();
const userInput = {
    email: "test2@example.com",
    name: "Jane Doe1",
    password: "Password123",
    passwordConfirmation: "Password123",
};
const sessionInput = {
    email: "test123123123@example.com",
    password: "Password123123123123",
};
const mockRequest = () => {
    return {
        body: {
            email: "test123123123@example.com",
            password: "Password123123123123",
        },
    };
};
const userId = new mongoose_1.default.Types.ObjectId().toString();
const userPayload = {
    email: "test2@example.com",
    name: "Jane Doe1",
    _id: new mongoose_1.default.Types.ObjectId().toString(),
    createdAt: "2021-09-30T13:31:07.674Z",
    updatedAt: "2021-09-30T13:31:07.674Z",
    __v: 0,
};
const mockResponse = () => {
    return {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
    };
};
// user: userId,
//   valid: true,
//   userAgent: "PostmanRuntime/7.28.4",
describe("user", () => {
    describe("register user", () => {
        describe("valid user and password", () => {
            it("should return a user payload", async () => {
                const createUserServiceMock = jest
                    .spyOn(UserService, "createUser")
                    // @ts-ignore
                    .mockReturnValueOnce(userPayload);
                const { statusCode, body } = await (0, supertest_1.default)(app)
                    .post("/api/users")
                    .send(userInput);
                // console.log("body", body, "status", statusCode);
                expect(statusCode).toBe(200);
                expect(body).toEqual(userPayload);
                expect(createUserServiceMock).toHaveBeenCalledWith(userInput);
            });
        });
    });
    describe("given password do not match", () => {
        it("should return a 400", async () => {
            const createUserServiceMock = jest
                .spyOn(UserService, "createUser")
                // @ts-ignore
                .mockReturnValueOnce(userPayload);
            const { statusCode } = await (0, supertest_1.default)(app)
                .post("/api/users")
                .send(Object.assign(Object.assign({}, userInput), { passwordConfirmation: "notmatch" }));
            //console.log("status", statusCode);
            expect(statusCode).toBe(400);
            expect(createUserServiceMock).not.toHaveBeenCalled();
        });
    });
    describe("user service throws an error", () => {
        it("should return a 409 Conflict error", async () => {
            const createUserServiceMock = jest
                .spyOn(UserService, "createUser")
                // @ts-ignore
                .mockRejectedValueOnce("should fail");
            const { statusCode } = await (0, supertest_1.default)(app)
                .post("/api/users")
                .send(userInput);
            expect(statusCode).toBe(409);
            expect(createUserServiceMock).toHaveBeenCalled();
        });
    });
    // Pending fix
    // describe("create user session", () => {
    //   it("should return a 401", async () => {
    //     const mockReq = (mockRequest().body = {
    //       // @ts-ignore
    //       body: { email: "", password: "" },
    //     });
    //     const mockRes = mockResponse();
    //     // @ts-ignore
    //     await createUserSessionHandler(mockReq, mockRes);
    //     expect(UserService.validatePassword).toHaveBeenCalledWith({
    //       email: "",
    //       password: "",
    //     });
    //     expect(mockRes.status).toHaveBeenCalledWith(401);
    //     expect(mockRes.json).toHaveBeenCalledWith({
    //       error: "Invalid email or password",
    //     });
    //   });
    // });
    describe("username and password are valid", () => {
        it("should return accesstoken and refreshtoken", async () => {
            jest
                .spyOn(UserService, "validatePassword")
                // @ts-ignore
                .mockReturnValue(sessionInput);
            jest
                .spyOn(SessionService, "createSession")
                // @ts-ignore
                .mockReturnValue(userPayload);
            const req = {
                get: () => {
                    return "a user agent";
                },
                body: {
                    email: "test@example.com",
                    password: "Password123",
                },
            };
            const send = jest.fn();
            const res = { send };
            // @ts-ignore
            await (0, session_controller_1.createUserSessionHandler)(req, res);
            expect(send).toHaveBeenCalledWith({
                accessToken: expect.any(String),
                refreshToken: expect.any(String),
            });
        });
    });
});
//# sourceMappingURL=user.test.js.map