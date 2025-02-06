import request from "supertest";
import app from "../backend/app.js";
import Role from "../backend/module/role.model.js";

// Mock the Role model
jest.mock("../backend/module/role.model.js", () => ({
  //mock function to be configured to return specific values
  findOne: jest.fn(),
  findById: jest.fn(),
}));
describe("user login endpoint", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should return 401 for invalid username or password", async () => {
    Role.findOne.mockResolvedValue({
      username: "user",
      role: "user",
      comparePassword: jest.fn().mockResolvedValue(false), //will return false
      _id: "12345",
    });

    const invalidCredentials = { username: "user", password: "wrongPassword" };

    const res = await request(app)
      .post("/home/login")
      .send(invalidCredentials);

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("success", false);
    expect(res.body).toHaveProperty("message", "Invalid Username or password");
  });
});
