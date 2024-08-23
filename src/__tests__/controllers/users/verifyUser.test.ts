import request from "supertest";
import express from "express";
import { verifyUser } from "@/controllers/users/verifyUser";
import { User } from "@/models/user";
import { internalErrorHandler } from "@/middleware/errorHandlers";

const app = express();
app.use(express.json());
app.get("/verify/:verificationToken", verifyUser);
app.use(internalErrorHandler);

jest.mock("@/middleware/authMiddleware");
jest.mock("@/models/user");

describe("GET /verify/:verificationToken", () => {
  it("should verify the user and return 200 if the token is valid", async () => {
    const mockUser = {
      id: "12345",
      verify: false,
      verificationToken: "valid-token",
    };

    (User.findOneAndUpdate as jest.Mock).mockResolvedValue(mockUser);

    const response = await request(app).get("/verify/valid-token");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: "Success",
      code: 200,
      message: "Verification successful",
    });
  });

  it("should return 404 if the user is not found", async () => {
    (User.findOneAndUpdate as jest.Mock).mockResolvedValue(null);

    const response = await request(app).get("/verify/invalid-token");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      status: "Not Found",
      code: 404,
      message: "User not found",
    });
  });

  it("should handle errors and call next with the error", async () => {
    (User.findOneAndUpdate as jest.Mock).mockRejectedValue(new Error("Error"));

    const response = await request(app).get("/verify/something");

    expect(response.status).toBe(500);
  });
});
