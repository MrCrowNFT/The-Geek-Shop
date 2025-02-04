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
  findOne: jest.fn(),
  findByIdAndDelete: jest.fn(),
}));

describe("admin adds new product", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should return 400 if no name in the new product", async () => {
    const adminToken = "mocked-admin-token";

    const res = await request(app)
      .post("/admin/products/newproduct")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        priceTag: 100,
        total_cost: { cost: 50, shipping: 10 },
        isAvailable: true,
        images: ["https://example.com/image.jpg"],
      });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Missing required fields");
  });
  it("should return 400 if SKU already exists", async () => {
    const adminToken = "mocked-admin-token";
    Product.findOne.mockResolvedValue({ sku: 123456 }); // Simulate an existing SKU

    const res = await request(app)
      .post("/admin/products/newproduct")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Test Product",
        priceTag: 100,
        total_cost: { cost: 50, shipping: 10 },
        isAvailable: true,
        images: ["https://example.com/image.jpg"],
        sku: 123456,
      });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("SKU already exists");
  });
});

describe("admin deletes product from db", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should return 404 if product not found", async () => {
    const adminToken = "mocked-admin-token";

    Product.findByIdAndDelete.mockResolvedValue(null);

    const res = await request(app)
      .delete("/admin/products/:10")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ id: 10 });

    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Product not found");
  });
});
