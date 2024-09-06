import express from "express";
import request from "supertest";
import { deleteContact } from "@/controllers/contacts/deleteContact";
import Contact from "@/models/contact";
import { internalErrorHandler } from "@/middleware/errorHandlers";

const app = express();
app.use(express.json());

jest.mock("@/models/contact");
const mockFindByIdAndDelete = Contact.findByIdAndDelete as jest.Mock;

app.delete("/contacts/:contactId", deleteContact);
app.use(internalErrorHandler);

describe("DELETE /contacts/:contactId", () => {
  it("should delete a contact and return a success message", async () => {
    const mockContact = { _id: "contact-id" };
    mockFindByIdAndDelete.mockResolvedValue(mockContact);

    const response = await request(app).delete("/contacts/contact-id");

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Contact deleted");
    expect(response.body.data).toEqual({ id: "contact-id" });
  });

  it("should return 404 if contact is not found", async () => {
    mockFindByIdAndDelete.mockResolvedValue(null);

    const response = await request(app).delete("/contacts/contact-id");

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Contact not found");
  });

  it("should handle errors and call next with the error", async () => {
    mockFindByIdAndDelete.mockRejectedValue(new Error("Something went wrong"));

    const response = await request(app).delete("/contacts/contact-id");

    expect(response.status).toBe(500);
  });
});
