import request from "supertest";
import express from "express";
import { loginUser } from "@/controllers/users/loginUser";
import { User } from "@/models/user";
import jwt from "jsonwebtoken";
import { internalErrorHandler } from "@/middleware/errorHandlers";

jest.mock("jsonwebtoken");
jest.mock("@/models/user");

const app = express();
app.use(express.json());
app.post("/login", loginUser);
app.use(internalErrorHandler);

const mockJwtSign = jwt.sign as jest.Mock;
const mockFindOne = User.findOne as jest.Mock;
const mockValidPassword = User.prototype.validPassword as jest.Mock;
const mockFindByIdAndUpdate = User.findByIdAndUpdate as jest.Mock;

describe("loginUser Integration Tests", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should log in a user successfully", async () => {
    const email = "test@example.com";
    const password = "password123";
    const token = "mockToken";
    const user = {
      id: "userId",
      name: "Test User",
      email,
      verify: true,
      validPassword: mockValidPassword.mockResolvedValue(true),
    };

    mockFindOne.mockResolvedValue(user);
    mockJwtSign.mockReturnValue(token);
    mockFindByIdAndUpdate.mockResolvedValue(user);

    const response = await request(app)
      .post("/login")
      .send({ email, password });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: "OK",
      code: 200,
      token,
      data: {
        user: {
          name: user.name,
          email: user.email,
        },
      },
    });
    expect(mockJwtSign).toHaveBeenCalledWith(
      { id: user.id },
      process.env.SECRET as string,
      { expiresIn: "12h" }
    );
    expect(mockFindByIdAndUpdate).toHaveBeenCalledWith(user.id, { token });
  });

  it("should return 401 if user is not found", async () => {
    mockFindOne.mockResolvedValue(null);

    const response = await request(app).post("/login").send({
      email: "unknown@example.com",
      password: "password123",
    });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      status: "Unauthorized",
      code: 401,
      message: "Invalid email or password",
    });
  });

  it("should return 403 if user email is not verified", async () => {
    const email = "test@example.com";
    const password = "password123";
    const user = {
      id: "userId",
      name: "Test User",
      email,
      verify: false,
      validPassword: mockValidPassword.mockResolvedValue(true),
    };

    mockFindOne.mockResolvedValue(user);

    const response = await request(app)
      .post("/login")
      .send({ email, password });

    expect(response.status).toBe(403);
    expect(response.body).toEqual({
      status: "Forbidden",
      code: 403,
      message: "Email not verified",
    });
  });

  it("should return 401 if password is incorrect", async () => {
    const email = "test@example.com";
    const password = "wrongPassword";
    const user = {
      id: "userId",
      name: "Test User",
      email,
      verify: true,
      validPassword: mockValidPassword.mockResolvedValue(false),
    };

    mockFindOne.mockResolvedValue(user);

    const response = await request(app)
      .post("/login")
      .send({ email, password });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      status: "Unauthorized",
      code: 401,
      message: "Invalid email or password",
    });
  });

  it("should call next with error if an exception is thrown", async () => {
    const email = "test@example.com";
    const password = "password123";

    mockFindOne.mockRejectedValue(new Error("Error"));

    const response = await request(app)
      .post("/login")
      .send({ email, password });

    expect(response.status).toBe(500);
  });
});
