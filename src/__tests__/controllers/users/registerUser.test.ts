import request from "supertest";
import express from "express";
import { registerUser } from "@/controllers/users/registerUser";
import { User } from "@/models/user";
import { sendVerificationMail } from "@/helpers/sendVerificationMail";
import { internalErrorHandler } from "@/middleware/errorHandlers";

jest.mock("@/models/user");
jest.mock("@/helpers/sendVerificationMail");

const mockedSendVerificationMail = sendVerificationMail as jest.MockedFunction<
  typeof sendVerificationMail
>;
const mockedFindOne = User.findOne as jest.MockedFunction<typeof User.findOne>;
const mockedSave = jest.fn();
const mockedSetPassword = jest.fn();

const app = express();
app.use(express.json());
app.post("/register", registerUser);
app.use(internalErrorHandler);

beforeEach(() => {
  jest.resetAllMocks();
});

test("should create a new user and send a verification email", async () => {
  mockedFindOne.mockResolvedValue(null);
  User.prototype.setPassword = mockedSetPassword;
  User.prototype.save = mockedSave;
  mockedSendVerificationMail.mockResolvedValueOnce();

  const response = await request(app).post("/register").send({
    name: "John Doe",
    email: "john.doe@example.com",
    password: "password123",
  });

  expect(response.status).toBe(201);
  expect(response.body).toEqual({
    status: "Created",
    code: 201,
    data: {
      name: "John Doe",
      email: "john.doe@example.com",
      verificationToken: expect.any(String),
    },
  });

  expect(mockedSendVerificationMail).toHaveBeenCalledWith({
    userEmail: "john.doe@example.com",
    verificationToken: expect.any(String),
  });
  expect(mockedFindOne).toHaveBeenCalledWith({ email: "john.doe@example.com" });
  expect(mockedSetPassword).toHaveBeenCalledWith("password123");
  expect(mockedSave).toHaveBeenCalled();
});

test("should return conflict if email is already registered and not verified", async () => {
  mockedFindOne.mockResolvedValue({
    verify: false,
  } as any);

  const response = await request(app).post("/register").send({
    name: "Jane Doe",
    email: "jane.doe@example.com",
    password: "password456",
  });

  expect(response.status).toBe(409);
  expect(response.body).toEqual({
    status: "Conflict",
    code: 409,
    message:
      "Email is already registered but not verified. Please verify your email.",
  });

  expect(mockedFindOne).toHaveBeenCalledWith({ email: "jane.doe@example.com" });
  expect(mockedSendVerificationMail).not.toHaveBeenCalled();
});

test("should return conflict if email is already in use", async () => {
  mockedFindOne.mockResolvedValue({
    verify: true,
  } as any);

  const response = await request(app).post("/register").send({
    name: "Alice Smith",
    email: "alice.smith@example.com",
    password: "password789",
  });

  expect(response.status).toBe(409);
  expect(response.body).toEqual({
    status: "Conflict",
    code: 409,
    message: "Email is already in use",
  });

  expect(mockedFindOne).toHaveBeenCalledWith({
    email: "alice.smith@example.com",
  });
  expect(mockedSendVerificationMail).not.toHaveBeenCalled();
});

test("should handle errors gracefully", async () => {
  mockedFindOne.mockRejectedValue(new Error("Database error"));

  const response = await request(app).post("/register").send({
    name: "Error User",
    email: "error.user@example.com",
    password: "errorpass",
  });

  expect(response.status).toBe(500);
  expect(response.body).toEqual({
    status: "Error",
    message: "Database error",
  });
});
