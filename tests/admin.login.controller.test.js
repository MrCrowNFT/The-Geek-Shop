import request from "supertest";
import app from "../backend/app.js";
import Role from "../backend/module/role.model.js";
import jwt from "jsonwebtoken";

// Mock the Role model: Replaces the actual Role module with a mock object
jest.mock("../backend/module/role.model.js", () => ({
  //mock function to be configured to return specific values
  findOne: jest.fn(),
}));

// Mock JWT verification
jest.mock("jsonwebtoken", () => ({
  verify: jest.fn((token, secret) => {
    if (token === "mocked-token") return { role: "super_admin" }; // Simulated valid token
    throw new Error("Invalid token");
  }),
  sign: jest.fn(() => "mocked-token"), // Mock signing tokens
}));

//*ADMIN LOGIN TESTS
describe("Admin Login Endpoint Accessibility", () => {
  beforeEach(() => {
    // Clear mocks before each test to ensure isolation
    jest.clearAllMocks();
  });

  it("should respond to a POST request at /admin/login", async () => {
    // Mock database response: Simulates the Role.findOne() database call and resolves it to null
    //mockResolvedValue: Is used because Role.findOne is an async operation that returns a promise.
    Role.findOne.mockResolvedValue(null);

    const res = await request(app).post("/admin/login").send({});
    expect(res.statusCode).toBeGreaterThanOrEqual(400); // Expect 4xx response for empty body
  });
  it("should return 200 and a token for valid admin credentials", async () => {
    //mock valid user in db
    Role.findOne.mockResolvedValue({
      username: "admin",
      role: "admin",
      comparePassword: jest.fn().mockResolvedValue(true), // Simulates correct password
      _id: "12345",
    });
    //mock request body credentials (same username so login should
    // work as mock comparePassword true)
    const validCredentials = { username: "admin", password: "password123" };

    const res = await request(app).post("/admin/login").send(validCredentials);

    // Assertions
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body).toHaveProperty("token");
    expect(res.body.token).toBeDefined(); // Ensure the token is returned
  });

  it("should return 401 when incorrect password", async () => {
    Role.findOne.mockResolvedValue({
      username: "admin",
      role: "admin",
      comparePassword: jest.fn().mockResolvedValue(false), //will return false
      _id: "12345",
    });

    const invalidCredentials = { username: "admin", password: "wrongPassword" };

    const res = await request(app)
      .post("/admin//login")
      .send(invalidCredentials);

    //assertions
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("success", false);
    expect(res.body).toHaveProperty("message", "Invalid Username or password");
  });
  it("should return 401 when role is not admin or super_admin", async () => {
    Role.findOne.mockResolvedValue({
      //even though user as a role in not yet added, it might in the future}
      username: "user",
      role: "user",
      comparePassword: jest.fn().mockResolvedValue(true), //password will match
      _id: "12345",
    });

    const nonAdminCredentials = { username: "user", password: "123456" };

    const res = await request(app)
      .post("/admin/login")
      .send(nonAdminCredentials);

    //assertions
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("success", false);
    expect(res.body).toHaveProperty("message", "Unauthorized");
  });
  it("should return 500 for server errors", async () => {
    // mock a new database error
    Role.findOne.mockRejectedValue(new Error("Database error"));

    const res = await request(app)
      .post("/admin/login")
      .send({ username: "admin", password: "password123" });

    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty("success", false);
    expect(res.body).toHaveProperty("message", "Server error");
  });
});

//*NEW ADMIN TESTS
describe("New Admin Creation Endpoint", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 if username, password, or role is missing when creating new admin", async () => {
    const adminToken = jwt.sign({ role: "super_admin" }, "testsecret"); // Mock token

    const res = await request(app)
      .post("/admin/newAdmin")
      .set("Authorization", `Bearer ${adminToken}`)
      //send new admin without username
      .send({
        username: "",
        password: "password123",
        role: "admin",
      });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Username, password, and role are required.");
  });

  it("should return 403 if user is not a super admin", async () => {
    jwt.verify.mockReturnValue({ role: "admin" }); // Mock token as admin

    const res = await request(app)
      .post("/admin/newAdmin")
      .set("Authorization", `Bearer invalid_token`)
      .send({
        username: "newAdmin",
        password: "password123",
        role: "admin",
      });

    expect(res.status).toBe(403);
    expect(res.body.message).toBe("Access denied. Super admin role required.");
  });
  //there is an issue with the mock token, it can not be used twice?
  it("should return 400 if username, password, or role is missing when creating new admin DUP", async () => {
    const adminToken = jwt.sign({ role: "super_admin" }, "testsecret"); // Mock token

    const res = await request(app)
      .post("/admin/newAdmin")
      .set("Authorization", `Bearer ${adminToken}`)
      //send new admin without username
      .send({
        username: "",
        password: "password123",
        role: "admin",
      });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Username, password, and role are required.");
  });

  it("should return 400 if username already exists", async () => {
    //Role.findOne.mockReturnValue({ username: "newAdmin" });

    const res = await request(app)
      .post("/admin/newAdmin")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        username: "newAdmin",
        password: "password123",
        role: "admin",
      });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Admin with this username already exists.");
  });
});
