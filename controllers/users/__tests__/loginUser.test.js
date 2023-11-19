import jwt from "jsonwebtoken";
import { jest, describe, test, expect } from "@jest/globals";

import User from "#models/user.js";
import { validateData } from "#validators/index.js";
import { loginUser } from "#controllers/users/index.js";

// 100% COVERAGE

jest.mock("jsonwebtoken");
jest.mock("#models/user.js");
jest.mock("#validators/index.js");

describe("loginUser function", () => {
  const mockRequest = {
    body: {
      email: "example@example.com",
      password: "examplePassword",
    },
  };
  const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const mockNext = jest.fn();

  // Test dla prawidłowego logowania
  test("should return a token when login is successful", async () => {
    User.findOne.mockResolvedValue({
      id: "123",
      email: "test@example.com",
      subscription: "premium",
      avatarURL: "avatar.jpg",
      validPassword: jest.fn(() => true),
      save: jest.fn(),
    });

    validateData.mockReturnValue({
      isValid: true,
      value: {
        email: "test@example.com",
        password: "password",
      },
    });

    await loginUser(mockRequest, mockResponse, mockNext);

    const token = expect(jwt.sign).toHaveBeenCalledWith(
      { id: "123" },
      expect.any(String),
      {
        expiresIn: "12h",
      }
    );

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: "OK",
      code: 200,
      data: {
        token,
        user: {
          email: expect.any(String),
          subscription: expect.any(String),
          avatarURL: expect.any(String),
        },
      },
    });
  });

  // Test dla nieprawidłowych danych logowania
  test("should return an error when invalid data is provided", async () => {
    validateData.mockReturnValue({
      isValid: false,
      errorMessage: "Invalid data",
    });

    await loginUser(mockRequest, mockResponse, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Invalid data",
    });
  });

  // Test dla !isPasswordValid
  test("should return an error when password is invalid", async () => {
    User.findOne.mockResolvedValue({
      email: "test@example.com",
      validPassword: jest.fn(() => false),
      id: "123",
      subscription: "premium",
      avatarURL: "avatar.jpg",
      save: jest.fn(),
    });

    validateData.mockReturnValue({
      isValid: true,
      value: {
        email: "test@example.com",
        password: "password",
      },
    });

    await loginUser(mockRequest, mockResponse, mockNext);

    expect(User.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: "Unauthorized",
      code: 401,
      message: "Email or password is wrong",
    });
  });

  // test dla bloku catch error
  test("should call next with an error when an error occurs", async () => {
    const error = new Error("Something went wrong");

    User.findOne.mockRejectedValue(error);

    await loginUser(mockRequest, mockResponse, mockNext);

    expect(mockNext).toHaveBeenCalledWith(error);
  });
});
