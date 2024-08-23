import Joi from "joi";
import { validateData } from "@/helpers/validateData";
import { contactValidationSchema } from "@/validators/contactSchema";

describe("validateData", () => {
  it("should return valid result for valid data", () => {
    const data = {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "123-456-7890",
    };
    const result = validateData(contactValidationSchema, data);

    expect(result.isValid).toBe(true);
    expect(result.value).toEqual(data);
    expect(result.errorMessage).toBeUndefined();
    expect(result.invalidParam).toBeUndefined();
  });

  it("should return error if required field is missing", () => {
    const data = {
      email: "john.doe@example.com",
      phone: "123-456-7890",
    };
    const result = validateData(contactValidationSchema, data);

    expect(result.isValid).toBe(false);
    expect(result.errorMessage).toBe('Missing required "name" field');
    expect(result.invalidParam).toBe("name");
  });

  it("should return error if field exceeds max length", () => {
    const data = {
      name: "A very long name that exceeds the maximum length of forty characters",
      email: "john.doe@example.com",
      phone: "123-456-7890",
    };
    const result = validateData(contactValidationSchema, data);

    expect(result.isValid).toBe(false);
    expect(result.errorMessage).toBe(
      '"name" length must be less than or equal to 40 characters long'
    );
    expect(result.invalidParam).toBe("name");
  });

  it("should return error if email is invalid", () => {
    const data = {
      name: "John Doe",
      email: "invalid-email",
      phone: "123-456-7890",
    };
    const result = validateData(contactValidationSchema, data);

    expect(result.isValid).toBe(false);
    expect(result.errorMessage).toBe('"email" must be a valid email');
    expect(result.invalidParam).toBe("email");
  });
});
