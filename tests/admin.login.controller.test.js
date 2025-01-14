import request from "supertest";
import app from "../backend/app.js";

describe("Admin Login Endpoint", () => {
  it("should respond to a POST request at /admin/login", async () => {
    const res = await request(app).post("/admin/login").send({});
    console.log(res.body); // Log the response for debugging.
    expect(res.statusCode).toBeGreaterThanOrEqual(400); // Expect 4xx or 5xx response for an empty request.
  });
});