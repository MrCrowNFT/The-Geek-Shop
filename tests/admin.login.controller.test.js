import { request } from "supertest";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import app from "../backend/app.js";
import Role from "../backend/module/role.model";

jest.mock("../backend/module/role.model");
jest.mock("jsonwebtoken");

describe("Admin Login Controller", () => {
  beforeAll(async () => {
    //Connect to the in-memory-server mongoDB
    await mongoose.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });
  //disconect and clear mocks
  afterAll(async () => {
    await mongoose.disconnect();
    jest.clearAllMocks();
  });

  it("should return 200 and a token for valid admin credentials", async () => {
    // Mock admin in the database
    const mockAdmin = {
      _id: "mockId123",
      username: "admin",
      role: "admin",
      comparePassword: jest.fn().mockResolvedValue(true),
    };
    Role.findOne.mockResolvedValue(mockAdmin);

    // Mock JWT signing
    jwt.sign.mockReturnValue("mockToken");

    const res = await request(app)
      .post("/admin/login")
      .send({ username: "admin", password: "password123" });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.token).toBe("mockToken");
    expect(Role.findOne).toHaveBeenCalledWith({ username: "admin" });
  });

  it("should return 401 for invalid credentials", async () => {
    // Mock admin not found
    Role.findOne.mockResolvedValue(null);

    const res = await request(app)
      .post("/admin/login")
      .send({ username: "invalidUser", password: "wrongPassword" });

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Unauthorized");
  });

  it("should return 401 for incorrect password", async () => {
    // Mock admin but incorrect password
    const mockAdmin = {
      _id: "mockId123",
      username: "admin",
      role: "admin",
      comparePassword: jest.fn().mockResolvedValue(false),
    };
    Role.findOne.mockResolvedValue(mockAdmin);

    const res = await request(app)
      .post("/admin/login")
      .send({ username: "admin", password: "wrongPassword" });

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Invalid Username or password");
  });

  it("should return 500 for server errors", async () => {
    // Mock a database error
    Role.findOne.mockRejectedValue(new Error("Database error"));

    const res = await request(app)
      .post("/admin/login")
      .send({ username: "admin", password: "password123" });

    expect(res.statusCode).toBe(500);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Server error");
  });
});
