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
  // Mock functions to be configured to return specific values
  find: jest.fn(),
  findById: jest.fn(),
  findOne: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
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

    Category.findOne.mockResolvedValue({ name: "repeated-name" });

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

  it("should return 500 for server error", async () => {
    const adminToken = "mocked-admin-token";

    Category.findOne.mockRejectedValue(new Error("Database error"));

    const res = await request(app)
      .post("/categories/add")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "valid-name",
        description: "valid-description",
      });

    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Server error");
  });
});

describe("admin update category", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should return 404 for categoty not found", async () => {
    const adminToken = "mocked-admin-token";

    Category.findByIdAndUpdate.mockResolvedValue(null);

    const res = await request(app)
      .put("/categories/:10")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "not-found-name",
        description: "not-found-description",
      });
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Category not found");
  });
  it("should update category and return 200", async () => {
    const adminToken = "mocked-admin-token";

    const updatedCategory = {
      id: 10,
      name: "Updated Name",
      description: "Updated Description",
    };
    Category.findByIdAndUpdate.mockResolvedValue(updatedCategory);

    const res = await request(app)
      .put("/categories/10") // Correct method and route
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Updated Name",
        description: "Updated Description",
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toEqual(updatedCategory);
  });

  it("should return 500 for server error", async () => {
    const adminToken = "mocked-admin-token";

    Category.findByIdAndUpdate.mockRejectedValue(new Error("Database error"));

    const res = await request(app)
      .put("/categories/10")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "some-name",
        description: "some-description",
      });

    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Server error");
  });
});
describe("admin delete category", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should return 404 if category id not found", async () => {
    const adminToken = "mocked-admin-token";

    Category.findByIdAndDelete.mockResolvedValue(null);

    const res = await request(app)
      .delete("/categories/invalidId")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Category not found");
  });
});
