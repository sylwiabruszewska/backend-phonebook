import express from "express";
import request from "supertest";
import { getCurrentUser } from "@/controllers/users";
import { authMiddleware } from "@/middleware/authMiddleware";

jest.mock("@/middleware/authMiddleware");

const app = express();
app.use(express.json());
app.get("/current", authMiddleware, getCurrentUser);

describe("GET /current", () => {
  it("should return 200 and user data if user is authenticated", async () => {
    (authMiddleware as jest.Mock).mockImplementation((req, res, next) => {
      req.user = { name: "John Doe", email: "john@example.com" };
      next();
    });

    const response = await request(app).get("/current");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: "OK",
      code: 200,
      data: {
        user: {
          name: "John Doe",
          email: "john@example.com",
        },
      },
    });
  });

  it("should return 401 if user is not authenticated", async () => {
    (authMiddleware as jest.Mock).mockImplementation((req, res, next) => {
      res.status(401).json({
        status: "Unauthorized",
        code: 401,
        message: "Not authorized.",
      });
    });

    const response = await request(app).get("/current");

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      status: "Unauthorized",
      code: 401,
      message: "Not authorized.",
    });
  });
});
