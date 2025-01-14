import request from "supertest";
import app from "../backend/app.js";
import Role from "../backend/module/role.model.js";

// Mock the Role model
jest.mock("../backend/module/role.model.js", () => ({
  findOne: jest.fn(),
}));

describe("Admin Login Endpoint - Basic Accessibility", () => {
  it("should respond to a POST request at /admin/login", async () => {
    // Mock database response
    Role.findOne.mockResolvedValue(null);

    const res = await request(app).post("/admin/login").send({});
    expect(res.statusCode).toBeGreaterThanOrEqual(400); // Expect 4xx response for empty body
  });
});