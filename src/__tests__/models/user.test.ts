import mongoose from "mongoose";
import { User } from "@/models/user";
import { MongoMemoryServer } from "mongodb-memory-server";
import bCrypt from "bcryptjs";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("User Model Methods", () => {
  it("should correctly hash the password with setPassword", async () => {
    const password = "password123";
    const user = new User({
      name: "Test User",
      email: "test@example.com",
      password: "",
      verificationToken: "token123",
    });

    await user.setPassword(password);
    await user.save();
    const foundUser = await User.findOne({ email: "test@example.com" });

    expect(foundUser).not.toBeNull();
    expect(foundUser!.password).not.toBe(password);
    const isPasswordValid = await bCrypt.compare(password, foundUser!.password);
    expect(isPasswordValid).toBe(true);
  });

  it("should correctly validate the password with validPassword", async () => {
    const password = "password123";
    const user = new User({
      name: "Test User",
      email: "test@example.com",
      password: "",
      verificationToken: "token123",
    });

    await user.setPassword(password);
    const isPasswordValid = await user.validPassword(password);

    expect(isPasswordValid).toBe(true);
  });

  it("should return false for invalid password with validPassword", async () => {
    const correctPassword = "password123";
    const wrongPassword = "wrongPassword";
    const user = new User({
      name: "Test User",
      email: "test@example.com",
      password: "",
      verificationToken: "token123",
    });

    await user.setPassword(correctPassword);
    const isPasswordValid = await user.validPassword(wrongPassword);

    expect(isPasswordValid).toBe(false);
  });
});
