// Test case for users
const request = require("supertest");
const pool = require("../db/pool");
const app = require("../api/index");
const { expect } = require("chai");

const loginCredentials = {
  email: 'tester@gmail.com',
  password: '12345'
}

// Delete everything from users table before each test
before(async () => {
  await pool.query("TRUNCATE TABLE users RESTART IDENTITY CASCADE");
})

describe("User Endpoints", () => {
  it("should create a new user", async () => {
    const credentials = {
      username: 'tester',
      name: 'test',
      password: '12345',
      email: 'tester@gmail.com'
    }
    await request(app)
      .post("/auth/signup")
      .send(credentials)
      .expect('Content-Type', /application\/json/)
      .expect(201);
  })

  it("should login an existing user", async () => {
    const loggedUser = await request(app)
      .post("/auth/login")
      .send(loginCredentials)
      .expect('Content-Type', /application\/json/)
      .expect(200);

      expect(loggedUser.body.user).to.have.property('id', 1);
      expect(loggedUser.body.user).to.have.property('email', 'tester@gmail.com');
  })

  it("Should check for user cookie", async () => {
    const loggedUser = await request(app)
      .post("/auth/login")
      .send(loginCredentials)
      .expect(200);
    const cookies = loggedUser.headers['set-cookie'];

    // console.log("loggedUser.body ", loggedUser);
    const res = await request(app)
      .get("/auth/check_authentication")
      .set('Cookie', cookies)
      .expect(200);

    expect(res.body).to.have.property('message', 'User is authenticated');
  })

  it("Update user information", async () => {
    const loggedUser = await request(app)
      .post("/auth/login")
      .send(loginCredentials)
      .expect(200);
    const cookies = loggedUser.headers['set-cookie'];
    
    const updatedInfo = {
      name: 'updated test',
      username: 'updated tester',
      email: 'updatedtester@gmail.com',
      password: '12345',
    }

    const res = await request(app)
      .put("/auth/user")
      .set('Cookie', cookies)
      .send(updatedInfo)
      .expect(200);

    expect(res.body).to.have.property('id', 1);
    expect(res.body).to.have.property('name', 'updated test');
    expect(res.body).to.have.property('username', 'updated tester');
    expect(res.body).to.have.property('email', 'updatedtester@gmail.com');
  })
})

