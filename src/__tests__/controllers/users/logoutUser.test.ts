import request from "supertest";
import express from "express";
import { logoutUser } from "@/controllers/users/logoutUser";
import { authMiddleware } from "@/middleware/authMiddleware";
import { User } from "@/models/user";

const app = express();
app.use(express.json());
app.post("/logout", authMiddleware, logoutUser);

jest.mock("@/middleware/authMiddleware");
jest.mock("@/models/user");

describe("POST /logout", () => {
  it("should logout the user and return 204 if the user is authenticated", async () => {
    (authMiddleware as jest.Mock).mockImplementation((req, res, next) => {
      req.user = { id: "12345" };
      next();
    });

    (User.findByIdAndUpdate as jest.Mock).mockResolvedValue({
      id: "12345",
      token: null,
    });

    const response = await request(app).post("/logout");

    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
  });

  it("should return 404 if the user is not found", async () => {
    (authMiddleware as jest.Mock).mockImplementation((req, res, next) => {
      req.user = { id: "12345" };
      next();
    });

    (User.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

    const response = await request(app).post("/logout");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      status: "Not Found",
      code: 404,
      message: "User not found",
    });
  });
});
