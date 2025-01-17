import request from "supertest";
import app from "../backend/app.js";
import Role from "../backend/module/role.model.js";
import jwt from "jsonwebtoken";

// Mock the Role model: Replaces the actual Role module with a mock object
jest.mock("../backend/module/role.model.js", () => ({
  //mock function to be configured to return specific values
  findOne: jest.fn(),
  findById: jest.fn(),
}));

// Mock JWT verification
jest.mock("jsonwebtoken", () => ({
  verify: jest.fn((token, secret) => {
    if (token === "mocked-super_admin-token") return { role: "super_admin" }; // Simulated valid token
    if (token === "mocked-admin-token") return { role: "admin" };
    throw new Error("Invalid token");
  }),
  sign: jest.fn(() => "mocked-token"), // Mock signing tokens
}));

//*ADMIN LOGIN TESTS
describe("Admin Login Endpoint Accessibility", () => {
  afterEach(() => {
    // Clear mocks before each test to ensure isolation
    jest.clearAllMocks();
  });

  it("should respond to a POST request at /admin/login", async () => {
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
      .post("/admin/login")
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
    const superAdminToken = "mocked-super_admin-token"; // Mock token

    const res = await request(app)
      .post("/admin/newAdmin")
      .set("Authorization", `Bearer ${superAdminToken}`)
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
    const adminToken = "mocked-admin-token";

    const res = await request(app)
      .post("/admin/newAdmin")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        username: "newAdmin",
        password: "password123",
        role: "admin",
      });

    expect(res.status).toBe(403);
    expect(res.body.message).toBe("Access denied. Super admin role required.");
  });
  it("should return 400 if username already exists", async () => {
    const superAdminToken = "mocked-super_admin-token"; // Mock super admin token

    // Mock the database to return an existing admin
    Role.findOne.mockResolvedValue({ username: "existingAdmin" });

    const res = await request(app)
      .post("/admin/newAdmin")
      .set("Authorization", `Bearer ${superAdminToken}`)
      .send({
        username: "existingAdmin",
        password: "password123",
        role: "admin",
      });

    // Assertions
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Admin with this username already exists.");
  });
});

//*CHANGE PASSWORD TEST
describe("Change Password Endpoint", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 if currentPassword or newPassword is missing", async () => {
    const adminToken = "mocked-admin-token";

    const res = await request(app)
      .put("/admin/newPassword")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ currentPassword: "", newPassword: "" });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe(
      "Current password and new password are required."
    );
  });

  it("should return 404 if admin is not found", async () => {
    const adminToken = "mocked-admin-token";

    // Mock Role.findById to return null
    Role.findById.mockResolvedValue(null);

    const res = await request(app)
      .put("/admin/newPassword")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ currentPassword: "oldPassword", newPassword: "newPassword" });

    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Admin not found.");
  });

  it("should return 401 if current password is incorrect", async () => {
    const adminToken = "mocked-admin-token";

    // Mock Role.findById to return a valid admin object
    Role.findById.mockResolvedValue({
      comparePassword: jest.fn().mockResolvedValue(false), // Simulate incorrect password
    });

    const res = await request(app)
      .put("/admin/newPassword")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ currentPassword: "wrongPassword", newPassword: "newPassword" });

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Current password is incorrect.");
  });

  it("should return 200 and update the password for valid input", async () => {
    const adminToken = "mocked-admin-token";

    // Mock Role.findById to return a valid admin object
    Role.findById.mockResolvedValue({
      comparePassword: jest.fn().mockResolvedValue(true), // Simulate correct password
      save: jest.fn().mockResolvedValue(), // Simulate successful save
    });

    const res = await request(app)
      .put("/admin/newPassword")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ currentPassword: "oldPassword", newPassword: "newPassword" });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("Password updated successfully.");
  });
});
