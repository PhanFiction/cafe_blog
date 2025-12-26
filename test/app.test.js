import request from 'supertest';
import { expect } from 'chai';
import app from '../api/index.js';

describe("GET /", () => {
  it("should return status ok", async () => {
    const res = await request(app).get("/");

    expect(res.status).to.equal(200);
    expect(res.text).to.equal('Cafe Blog API');
  });
});
