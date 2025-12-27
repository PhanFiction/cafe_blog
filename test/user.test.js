// Test case for users
const request = require("supertest");
const pool = require("../db/pool");
const app = require("../api/index");

// Delete everything from users table before each test
beforeEach(async () => {
  await pool.query("TRUNCATE TABLE users RESTART IDENTITY CASCADE");
});

describe("User Endpoints", () => {
  it("should create a new user", async () => {
    const credentials = {
      username: 'tester',
      name: 'test',
      password: '12345',
      email: 'test@gmail.com'
    }
    await request(app)
      .post("/auth/signup")
      .send(credentials)
      .expect('Content-Type', /application\/json/)
      .expect(201);
  });
});