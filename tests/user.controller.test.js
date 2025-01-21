import request from "supertest";
import app from "../backend/app.js";
import Product from "../backend/module/product.model.js";
import mongoose from "mongoose";

// Mocks
jest.mock("../backend/module/product.model.js", () => ({
  find: jest.fn(),
  findById: jest.fn(),
}));

describe("User product request", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 200 and products when requesting", async () => {
    const mockedProducts = [
      { id: 1, name: "Product A", price: 100 },
      { id: 2, name: "Product B", price: 200 },
    ];

    Product.find.mockResolvedValue(mockedProducts);

    const res = await request(app).get("/home/products");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toEqual(mockedProducts); // Validate the returned products
    expect(Product.find).toHaveBeenCalledTimes(1); // Ensure `find` was called
    expect(Product.find).toHaveBeenCalledWith({}); // Check `find` was called correctly
  });

  it("should return 500 for server error", async () => {
    Product.find.mockRejectedValue(new Error("Database error"));

    const res = await request(app).get("/home/products");

    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Server error");
  });
});

describe("User product request by id", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 404 for invalid product id", async () => {
    Product.findById.mockResolvedValue(null);

    const res = await request(app).get("/home/products/invalidId");

    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Product not found");
    expect(Product.findById).toHaveBeenCalledWith("invalidId");
  });
});
