import request from "supertest";
import app from "../backend/app.js";
import Role from "../backend/module/role.model.js";

// Mock the Role model: Replaces the actual Role module with a mock object
jest.mock("../backend/module/role.model.js", () => ({
  //mock function to be configured to return specific values
  findOne: jest.fn(),
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
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test to ensure isolation
  });

  it("should create new admin and return 201 with created data", async () => {
    // Mock `findOne` to simulate no existing admin with the username
    Role.findOne.mockResolvedValue(null);

    // Simulate successful admin creation
    const mockSave = jest.fn().mockResolvedValue({
      username: "newAdmin",
      role: "admin",
      _id: "12345",
    });

    // Override the Role model's behavior for this test
    jest.mock("../backend/module/role.model.js", () => {
      return jest.fn().mockImplementation(() => ({
        save: mockSave,
      }));
    });

    const newAdminData = {
      username: "newAdmin",
      password: "password123",
      role: "admin",
    };

    // Simulate an authenticated super_admin request
    const res = await request(app)
      .post("/admin/new")
      .set("Authorization", "Bearer valid_super_admin_token") // Add mock token
      .send(newAdminData);

    // Assertions
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body).toHaveProperty(
      "message",
      "New admin created successfully"
    );
    expect(res.body.data).toHaveProperty("username", "newAdmin");
    expect(mockSave).toHaveBeenCalled();
  });
});
