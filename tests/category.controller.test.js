import request from "supertest";
import app from "../backend/app.js";
import Category from "../backend/module/category.model.js";

// Mock JWT verification
jest.mock("jsonwebtoken", () => ({
  verify: jest.fn((token, secret) => {
    if (token === "mocked-super_admin-token") return { role: "super_admin" }; // Simulated valid token
    if (token === "mocked-admin-token") return { role: "admin" };
    throw new Error("Invalid token");
  }),
  sign: jest.fn(() => "mocked-token"), // Mock signing tokens
}));

jest.mock("../backend/module/category.model.js", () => ({
  //mock function to be configured to return specific values
  find: jest.fn(),
  findById: jest.fn(),
}));

describe("Admin get categories from db", () => {
  it("Should return 200 and all categories", async () => {
    const adminToken = "mocked-admin-token";

    const mockedCategories = [
      { id: 1, name: "Figure", description: "Scale figure" },
      { id: 2, name: "Plushe", description: "Soft adorable plushies" },
    ];

    Category.find.mockResolvedValue(mockedCategories);

    const res = await request(app)
      .get("/categories/")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toEqual(mockedCategories);
    expect(Category.find).toHaveBeenCalledTimes(1);
  });

  it("should return 500 for server error", async () => {
    const adminToken = "mocked-admin-token";

    Category.find.mockRejectedValue(new Error("Database error"));

    const res = await request(app)
      .get("/categories/")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Server error");
  });
});
