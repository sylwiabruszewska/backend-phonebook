import express from "express";
import request from "supertest";
import { patchContactStatus } from "@/controllers/contacts/patchContactStatus";
import Contact from "@/models/contact";
import { internalErrorHandler } from "@/middleware/errorHandlers";

const app = express();
app.use(express.json());
app.patch("/contacts/:contactId/status", patchContactStatus);
app.use(internalErrorHandler);

jest.mock("@/models/contact");
const mockFindByIdAndUpdate = Contact.findByIdAndUpdate as jest.Mock;

describe("PATCH /contacts/:contactId/status", () => {
  it("should update the contact status and return the updated contact", async () => {
    const mockContact = { _id: "contact-id", favorite: true };
    mockFindByIdAndUpdate.mockResolvedValue(mockContact);

    const response = await request(app)
      .patch("/contacts/contact-id/status")
      .send({ favorite: true });

    expect(response.status).toBe(200);
    expect(response.body.data).toEqual(mockContact);
  });

  it("should return 400 if 'favorite' is not a boolean", async () => {
    const response = await request(app)
      .patch("/contacts/contact-id/status")
      .send({ favorite: "not-a-boolean" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Field 'favorite' must be a boolean");
  });

  it("should return 404 if contact is not found", async () => {
    mockFindByIdAndUpdate.mockResolvedValue(null);

    const response = await request(app)
      .patch("/contacts/contact-id/status")
      .send({ favorite: true });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Contact not found");
  });

  it("should handle errors and call next with the error", async () => {
    const mockError = new Error("Something went wrong");
    mockFindByIdAndUpdate.mockRejectedValue(mockError);

    const response = await request(app)
      .patch("/contacts/contact-id/status")
      .send({ favorite: true });

    expect(response.status).toBe(500);
  });
});
