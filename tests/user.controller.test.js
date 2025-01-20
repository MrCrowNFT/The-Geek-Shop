import request from "supertest";
import app from "../backend/app.js";
import Product from "../backend/module/product.model.js";

//Mocks
jest.mock("../backend/module/product.model.js", () => ({
  find: jest.fn(),
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
});
