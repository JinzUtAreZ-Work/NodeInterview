import supertest from "supertest";
import * as UserService from "../service/user.service";
import * as SessionService from "../service/session.service";
import mongoose from "mongoose";
import server from "../server";
import { createUserSessionHandler } from "../controller/session.controller";

const app = server();

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

const userId = new mongoose.Types.ObjectId().toString();

const userPayload = {
  email: "test2@example.com",
  name: "Jane Doe1",
  _id: new mongoose.Types.ObjectId().toString(),
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
        const { statusCode, body } = await supertest(app)
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
      const { statusCode } = await supertest(app)
        .post("/api/users")
        .send({ ...userInput, passwordConfirmation: "notmatch" });
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
      const { statusCode } = await supertest(app)
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
      await createUserSessionHandler(req, res);
      expect(send).toHaveBeenCalledWith({
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
      });
    });
  });
});
