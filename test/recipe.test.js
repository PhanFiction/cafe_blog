// Test case for recipes
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
  await pool.query("TRUNCATE TABLE recipes RESTART IDENTITY CASCADE");

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
})

const recipeData = {
  "title": "Mocha Coffee",
  "ingredients": [
    "1 cup strong brewed coffee",
    "1 cup milk",
    "2 tablespoons cocoa powder",
    "2 tablespoons sugar",
    "Whipped cream (optional)"
  ],
  "instructions": [
    "Brew a cup of strong coffee using your preferred method.",
    "In a small saucepan, heat the milk over medium heat until hot but not boiling.",
    "In a separate bowl, mix the cocoa powder and sugar together.",
    "Add the cocoa mixture to the hot milk and stir until fully dissolved.",
    "Pour the brewed coffee into a large mug.",
    "Add the hot chocolate milk to the coffee and stir well.",
    "Top with whipped cream if desired.",
    "Serve immediately and enjoy your mocha coffee!"
  ],
  "steps": [
    "Brew coffee",
    "Heat milk",
    "Mix cocoa and sugar",
    "Combine cocoa mixture with milk",
    "Pour coffee into mug",
    "Add chocolate milk to coffee",
    "Top with whipped cream",
    "Serve"
  ],
  "img": "https://coffeecopycat.com/wp-content/uploads/2024/01/MochaLatte-1200x1200-1.jpg",
  "description": "This mocha coffee recipe is a delightful blend of rich coffee and smooth chocolate, perfect for a cozy evening or a quick pick-me-up."
}

describe("Recipe API Endpoints test", () => {
  it("Create recipe", async () => {

    await request(app)
      .post('/recipes/create')
      .set('Cookie', cookies)
      .send(recipeData)
      .expect(201);

    const res = await request(app)
      .get('/recipes')
      .expect(200);

    expect(res.body).to.be.an('array');
    expect(res.body.length).to.equal(1);
    expect(res.body[0]).to.have.property('title', 'Mocha Coffee');
    expect(res.body[0]).to.have.property('description', 'This mocha coffee recipe is a delightful blend of rich coffee and smooth chocolate, perfect for a cozy evening or a quick pick-me-up.');
    expect(res.body[0].ingredients).to.be.an('array').to.have.lengthOf(5);
    expect(res.body[0].steps).to.be.an('array').with.lengthOf(8);
  })

  it('Delete recipe', async () => {
    const res = await request(app)
      .get('/recipes')
      .expect(200);

    const recipeId = res.body[0].id;

    await request(app)
      .delete(`/recipes/${recipeId}`)
      .set('Cookie', cookies)
      .expect(200);

    const resAfterDelete = await request(app)
      .get('/recipes')
      .expect(200);

    expect(resAfterDelete.body).to.be.an('array').that.is.empty;
  })

  it("Unauthorized create recipe attempt", async () => {
    await request(app)
      .post('/recipes/create')
      .send(recipeData)
      .expect(401);
  })
})