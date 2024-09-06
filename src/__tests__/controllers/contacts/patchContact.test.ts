import request from "supertest";
import express from "express";
import { patchContact } from "@/controllers/contacts";
import Contact from "@/models/contact";
import { AuthenticatedRequest } from "@/types/custom";
import { internalErrorHandler } from "@/middleware/errorHandlers";

jest.mock("@/models/contact");

const app = express();
app.use(express.json());
app.use(internalErrorHandler);
app.use((req: Partial<AuthenticatedRequest>, res, next) => {
  req.user = { id: "user-id" };
  next();
});

app.patch("/contacts/:contactId", patchContact);

describe("PATCH /contacts/:contactId", () => {
  it("should update contact and return 200 with updated data", async () => {
    const mockUpdatedContact = {
      _id: "contact-id",
      name: "John Doe",
      email: "john@example.com",
      phone: "123456789",
      favorite: false,
      owner: "user-id",
    };

    (Contact.findByIdAndUpdate as jest.Mock).mockResolvedValue(
      mockUpdatedContact
    );

    const response = await request(app).patch("/contacts/contact-id").send({
      name: "John Doe",
      email: "john@example.com",
      phone: "123456789",
      favorite: false,
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: "OK",
      code: 200,
      data: mockUpdatedContact,
    });
  });

  it("should return 404 if contact is not found", async () => {
    (Contact.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

    const response = await request(app).patch("/contacts/contact-id").send({
      name: "John Doe",
      email: "john@example.com",
      phone: "123456789",
      favorite: false,
    });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: "Contact not found",
    });
  });

  it("should handle errors and call next with the error", async () => {
    (Contact.findByIdAndUpdate as jest.Mock).mockRejectedValue(
      new Error("Something went wrong")
    );

    const response = await request(app).patch("/contacts/contact-id").send({});

    expect(response.status).toBe(500);
  });
});
