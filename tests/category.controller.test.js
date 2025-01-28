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
  findOne: jest.fn()
}));

describe("Admin get categories from db", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
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

describe("admin add new category", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should return 400 if no name on request body", async () => {
    const adminToken = "mocked-admin-token";

    const res = await request(app)
      .post("/categories/add")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "",
        description: "valid description",
      });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Category name is required");
  });
  it("should return 400 if category name already in use", async () => {
    const adminToken = "mocked-admin-token";

    Category.findOne.mockResolvedValue({name:"repeated-name" })

    const res = await request(app)
      .post("/categories/add")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "repeated-name",
        description: "valid description",
      });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Category already exists");
  });
});
