import request from "supertest";
import app from "../backend/app.js";
import Product from "../backend/module/product.model.js";

// Mock JWT verification
jest.mock("jsonwebtoken", () => ({
  verify: jest.fn((token, secret) => {
    if (token === "mocked-super_admin-token") return { role: "super_admin" }; // Simulated valid token
    if (token === "mocked-admin-token") return { role: "admin" };
    throw new Error("Invalid token");
  }),
  sign: jest.fn(() => "mocked-token"), // Mock signing tokens
}));

jest.mock("../backend/module/product.model.js", () => ({
  find: jest.fn(),
  findById: jest.fn(),
}));

describe("admin")
