import request from "supertest";
import express from "express";
import { postContact } from "@/controllers/contacts";
import Contact from "@/models/contact";
import { AuthenticatedRequest } from "@/types/custom";
import { internalErrorHandler } from "@/middleware/errorHandlers";
import { authMiddleware } from "@/middleware/authMiddleware";

jest.mock("@/models/contact");

const app = express();
app.use(express.json());
app.use(internalErrorHandler);
app.use((req: Partial<AuthenticatedRequest>, res, next) => {
  req.user = { id: "12345" };
  next();
});

app.post("/contacts", postContact);

describe("POST /contacts", () => {
  it("should create a new contact and return 201 status", async () => {
    const mockContact = {
      _id: "contact-id",
      name: "John Doe",
      email: "john@example.com",
      phone: "123456789",
      favorite: false,
      owner: "user-id",
    };

    (Contact.prototype.save as jest.Mock).mockResolvedValue(mockContact);

    const response = await request(app).post("/contacts").send({
      name: "John Doe",
      email: "john@example.com",
      phone: "123456789",
    });

    expect(response.status).toBe(201);
    expect(response.body.data).toEqual(mockContact);
  });

  it("should handle errors and call next with the error", async () => {
    (Contact.prototype.save as jest.Mock).mockRejectedValue(
      new Error("Something went wrong")
    );

    const response = await request(app).post("/contacts").send({});

    expect(response.status).toBe(500);
  });
});
