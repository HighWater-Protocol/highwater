/// <reference types="jest" />

import request from "supertest";
import app from "../src/app";

describe('GET /api/v1/clients', () => {
  it('should return an array', async () => {
    const res = await request(app).get('/api/v1/clients');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});
