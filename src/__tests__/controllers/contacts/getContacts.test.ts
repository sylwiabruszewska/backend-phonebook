import express from "express";
import request from "supertest";
import { getContacts } from "@/controllers/contacts/getContacts";
import Contact from "@/models/contact";
import { internalErrorHandler } from "@/middleware/errorHandlers";
import { GetContactsQuery } from "@/types/custom";

const app = express();
app.use(express.json());

jest.mock("@/models/contact");

app.get("/contacts", getContacts);
app.use(internalErrorHandler);

describe("GET /contacts", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should return contacts and pagination data", async () => {
    const mockContacts = [
      { _id: "1", name: "John Doe", phone: "1234567890", favorite: "true" },
      { _id: "2", name: "Jane Smith", phone: "0987654321", favorite: "false" },
    ];
    const mockTotalContacts = 2;
    const mockQuery: GetContactsQuery = {
      page: "1",
      limit: "10",
      favorite: "true",
      query: "John",
    };

    (Contact.find as jest.Mock).mockImplementation(() => ({
      sort: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue(mockContacts),
    }));
    (Contact.countDocuments as jest.Mock).mockResolvedValue(mockTotalContacts);

    const response = await request(app).get("/contacts").query(mockQuery);

    expect(response.status).toBe(200);
    expect(response.body.data).toEqual(mockContacts);
    expect(response.body.total).toBe(mockTotalContacts);
    expect(response.body.totalPages).toBe(1);
    expect(response.body.currentPage).toBe(1);
  });

  it("should return 400 if page or limit are invalid", async () => {
    const response = await request(app)
      .get("/contacts")
      .query({ page: "invalid", limit: "10" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Page and limit must be valid numbers");
  });

  it("should handle errors and call next with the error", async () => {
    const mockError = new Error("Something went wrong");
    (Contact.find as jest.Mock).mockResolvedValue(mockError);

    const response = await request(app).get("/contacts");

    expect(response.status).toBe(500);
  });
});
