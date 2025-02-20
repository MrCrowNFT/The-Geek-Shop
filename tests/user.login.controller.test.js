import request from "supertest";
import app from "../backend/app.js";
import Role from "../backend/module/role.model.js";

// Mock the Role model
jest.mock("../backend/module/role.model.js", () => ({
  //mock function to be configured to return specific values
  findOne: jest.fn(),
  findById: jest.fn(),
 
}));

// Mock JWT verification
jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(() => "mocked-token"),
}));

describe("user login endpoint", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should return 401 for invalid username or password", async () => {
    Role.findOne.mockResolvedValue({
      username: "user",
      role: "user",
      comparePassword: jest.fn().mockResolvedValue(false),
      _id: "12345",
    });

    const invalidCredentials = { username: "user", password: "wrongPassword" };

    const res = await request(app).post("/home/login").send(invalidCredentials);

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("success", false);
    expect(res.body).toHaveProperty("message", "Invalid Username or password");
  });

  it("should return 200 and a token for valid user credentials", async () => {
    Role.findOne.mockResolvedValue({
      username: "user",
      role: "user",
      comparePassword: jest.fn().mockResolvedValue(true),
      _id: "12345",
    });

    const validCredentials = { username: "user", password: "password123" };

    const res = await request(app).post("/home/login").send(validCredentials);
    console.log(res.body);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body).toHaveProperty("token", "mocked-token");
  });
  it("should return 500 for server error", async () => {
    Role.findOne.mockRejectedValue(new Error("Database error"));

    const res = await request(app)
      .post("/home/login")
      .send({ username: "admin", password: "password123" });

    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty("success", false);
    expect(res.body).toHaveProperty("message", "Server error");
  });
});

describe("user create new account", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should return 400 if username or password missing", async () => {
    const res = await request(app).post("/home/createAccount").send({
      username: "",
      password: "password123",
    });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Username and password are required.");
  });
  it("should return 400 if username already used", async () => {
    Role.findOne.mockResolvedValue({ username: "repeatedName" });

    const res = await request(app).post("/home/createAccount").send({
      username: "repeatedName",
      password: "password123",
    });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Username already in use");
  });
  it("should return 500 for server error", async () => {
    Role.findOne.mockRejectedValue(new Error("Database error"));

    const res = await request(app).post("/home/createAccount").send({
      username: "Name",
      password: "password123",
    });
    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Server error");
  });
  

});
