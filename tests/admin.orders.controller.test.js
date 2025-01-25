import request from "supertest";
import app from "../backend/app.js";
import Order from "../backend/module/order.model.js";

// Mock JWT verification
jest.mock("jsonwebtoken", () => ({
  verify: jest.fn((token, secret) => {
    if (token === "mocked-super_admin-token") return { role: "super_admin" }; // Simulated valid token
    if (token === "mocked-admin-token") return { role: "admin" };
    throw new Error("Invalid token");
  }),
  sign: jest.fn(() => "mocked-token"), // Mock signing tokens
}));

jest.mock("../backend/module/order.model.js", () => ({
  //mock function to be configured to return specific values
  find: jest.fn(),
  findById: jest.fn(),
}));

describe("Admin get orders from Db", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should return 200 and the orders upon valid admin request", async () => {
    const adminToken = "mocked-admin-token";

    const mockedOrders = [
      { id: 1, costumer: "Product A", paid_amount: 100 },
      { id: 2, costumer: "Product B", paid_amount: 200 },
    ];

    Order.find.mockResolvedValue(mockedOrders);

    const res = await request(app)
      .get("/admin/orders")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toEqual(mockedOrders); 
    expect(Order.find).toHaveBeenCalledTimes(1); 
  });

  it("should return 500 upon server error", async () => {
    const adminToken = "mocked-admin-token";

    Order.find.mockRejectedValue(new Error("Database error"));

    const res = await request(app)
      .get("/admin/orders")
      .set("Authorization", `Bearer ${adminToken}`);

      expect(res.status).toBe(500);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe("Server error");
  });
});
describe("Admin get orders from Db by Id", () =>{
  afterEach(()=>{
    jest.clearAllMocks();
  });
  it("should return 200 upon valid order id", async ()=>{
    const mockedOrder = { id: 123, costumer: "Product A", paid_amount: 100 };
    const adminToken = "mocked-admin-token";

    Order.findById.mockResolvedValue(mockedOrder);

    const res = await request(app).
      get("/admin/orders/123").
      set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toEqual(mockedOrder);
    expect(Order.findById).toHaveBeenCalledWith("123");
  })
  
  it("should return 404 for invalid order id", async() =>{
    const adminToken = "mocked-admin-token";
    Order.findById.mockResolvedValue(null);

    const res = await request(app).
      get("/admin/orders/invalidId").
      set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Order not found");
    expect(Order.findById).toHaveBeenCalledWith("invalidId");
  })
})
