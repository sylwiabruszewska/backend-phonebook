import express from "express";
import request from "supertest";
import { getContactById } from "@/controllers/contacts/getContactById";
import Contact from "@/models/contact";
import { internalErrorHandler } from "@/middleware/errorHandlers";

const app = express();
app.use(express.json());

jest.mock("@/models/contact");
const mockFindById = Contact.findById as jest.Mock;

app.get("/contacts/:contactId", getContactById);
app.use(internalErrorHandler);

describe("GET /contacts/:contactId", () => {
  it("should return a contact if found", async () => {
    const mockContact = {
      _id: "contact-id",
      name: "Test Contact",
      phone: "1234567890",
    };
    mockFindById.mockResolvedValue(mockContact);

    const response = await request(app).get("/contacts/contact-id");

    expect(response.status).toBe(200);
    expect(response.body.data).toEqual(mockContact);
  });

  it("should return 404 if contact is not found", async () => {
    mockFindById.mockResolvedValue(null);

    const response = await request(app).get("/contacts/contact-id");

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Contact not found");
  });

  it("should handle errors and call next with the error", async () => {
    mockFindById.mockRejectedValue(new Error("Something went wrong"));

    const response = await request(app).get("/contacts/contact-id");

    expect(response.status).toBe(500);
  });
});
