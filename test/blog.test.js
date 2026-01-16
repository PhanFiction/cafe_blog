// Test case for blog
const request = require("supertest");
const pool = require("../db/pool");
const app = require("../api/index");
const { expect } = require("chai");

const loginCredentials = {
  email: 'tester@gmail.com',
  password: '12345'
}

// Create user and login before running recipe tests
let cookies;
before(async () => {
  // Clear users and recipes table and reset the identity
  await pool.query("TRUNCATE TABLE users RESTART IDENTITY CASCADE");
  await pool.query("TRUNCATE TABLE blogs RESTART IDENTITY CASCADE");

  const credentials = {
    username: 'tester',
    name: 'test',
    password: '12345',
    email: 'tester@gmail.com'
  }

  await request(app)
    .post('/auth/signup')
    .send(credentials)
    .expect(201);

  const response = await request(app)
    .post('/auth/login')
    .send(loginCredentials)
    .expect(200);

  cookies = response.headers['set-cookie'];
});

describe("Blog API test", () => {
  it("Create blog post", async () => {
    const blogData = {
      "title": "My First Blog",
      "content": "This is the content of my first blog post.",
      "img": "https://coffeecopycat.com/wp-content/uploads/2024/01/MochaLatte-1200x1200-1.jpg",
    }
    await request(app)
      .post('/blogs/create')
      .set('Cookie', cookies)
      .send(blogData)
      .expect(201);

    const res = await request(app)
      .get('/blogs')
      .expect(200);
    
    expect(res.body[0].title).to.equal("My First Blog");
    expect(res.body[0].content).to.equal("This is the content of my first blog post.");
  })
  
  it("Fetch all blog posts", async () => {
    const res = await request(app)
      .get('/blogs')
      .expect(200);
    
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.greaterThan(0);
  })

  it("Fetch single blog post by ID", async () => {
    const res = await request(app)
      .get('/blogs/1')
      .expect(200);
    
    expect(res.body).to.have.property('id', 1);
    expect(res.body).to.have.property('title', 'My First Blog');
  })
})