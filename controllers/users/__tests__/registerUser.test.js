import gravatar from "gravatar";
import { jest, describe, test, expect } from "@jest/globals";

import User from "#models/user.js";
import { registerUser } from "#controllers/users/index.js";

// 100% COVERAGE

jest.mock("gravatar");
jest.mock("#models/user.js");

describe("registerUser function", () => {
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

  // Test dla poprawnej rejestracji nowego użytkownika
  test("should register a new user when email is not in use", async () => {
    User.findOne.mockResolvedValue(null);
    gravatar.url.mockReturnValue("mockedAvatarURL");

    User.mockResolvedValue({
      setPassword: jest.fn(),
      save: jest.fn(),
    });

    await registerUser(mockRequest, mockResponse, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: "Created",
      code: 201,
      data: {
        email: "example@example.com",
        avatarURL: "mockedAvatarURL",
      },
    });
  });

  // Test dla niepoprawnej rejestracji nowego użytkownika - email w użyciu
  test("should not register a new user when email is in use", async () => {
    User.findOne.mockResolvedValue(mockRequest.body.email);

    await registerUser(mockRequest, mockResponse, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(409);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: "Conflict",
      code: 409,
      message: "Email in use",
    });
  });

  // test dla bloku catch error
  test("should call next with an error when an error occurs", async () => {
    const error = new Error("Something went wrong");

    User.findOne.mockRejectedValue(error);

    await registerUser(mockRequest, mockResponse, mockNext);

    expect(mockNext).toHaveBeenCalledWith(error);
  });
});
