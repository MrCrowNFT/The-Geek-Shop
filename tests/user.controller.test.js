import request from "supertest";
import app from "../backend/app.js";
import Product from "../backend/module/product.model.js";

// Mocks
jest.mock("../backend/module/product.model.js", () => ({
  find: jest.fn(),
  findById: jest.fn(),
  countDocuments: jest.fn(),
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
  it("should return 200 and product upon valid id", async () => {
    const mockedProduct = { id: 123, name: "Product A", price: 200 };
    Product.findById.mockResolvedValue(mockedProduct);

    const res = await request(app).get("/home/products/123");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toEqual(mockedProduct);
    expect(Product.findById).toHaveBeenCalledWith("123");
  });
  it("should return 500 for server error", async () => {
    Product.findById.mockRejectedValue(new Error("Database error"));

    const res = await request(app).get("/home/products/123");

    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Server error");
  });
});
describe("Product Search", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should return 404 if no product with said criteria was found", async () => {
    // Mock find and populate chain
    Product.find.mockReturnValue({
      populate: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue([]),
    });

    // Mock countDocuments
    Product.countDocuments.mockResolvedValue(0);

    const res = await request(app).get(
      "/home/search?categories=1,2&minPrice=100&maxPrice=300"
    );

    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe(
      "No products found matching the search criteria."
    );
    expect(Product.find).toHaveBeenCalledWith({
      category: { $in: ["1", "2"] },
      priceTag: { $gte: 100, $lte: 300 },
    });
    expect(Product.find().populate).toHaveBeenCalledWith("category");
    expect(Product.find().skip).toHaveBeenCalledWith(0); // Default page = 1
    expect(Product.find().limit).toHaveBeenCalledWith(20); // Default limit = 20
    expect(Product.countDocuments).toHaveBeenCalledWith({
      category: { $in: ["1", "2"] },
      priceTag: { $gte: 100, $lte: 300 },
    });
  });

  it("should return 200 and products if search criteria match", async () => {
    const mockedProducts = [
      {
        id: 1,
        name: "Product A",
        price: 100,
        category: { _id: "1", name: "Category A" },
      },
      {
        id: 2,
        name: "Product B",
        price: 200,
        category: { _id: "2", name: "Category B" },
      },
    ];

    // Mock find and populate chain
    Product.find.mockReturnValue({
      populate: jest.fn().mockResolvedValue(mockedProducts),
    });

    const res = await request(app).get(
      "/home/search?categories=1,2&minPrice=100&maxPrice=300"
    );

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toEqual(mockedProducts);
    expect(Product.find).toHaveBeenCalledWith({
      category: { $in: ["1", "2"] },
      priceTag: { $gte: 100, $lte: 300 },
    });
    expect(Product.find().populate).toHaveBeenCalledWith("category");
  });

  it("should return 500 if there is a server error", async () => {
    Product.find.mockReturnValue({
      populate: jest.fn().mockRejectedValue(new Error("Database error")),
    });

    const res = await request(app).get(
      "/home/search?categories=1,2&minPrice=100&maxPrice=300"
    );

    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Server error");
  });
});
