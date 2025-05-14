/// <reference types="jest" />

import request from "supertest";
import app from "../src/app";

describe('GET /api/v1/compliance/logs', () => {
  it('should return an array', async () => {
    const res = await request(app).get('/api/v1/compliance/logs');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('GET /api/v1/compliance/reports', () => {
  it('should return an array', async () => {
    const res = await request(app).get('/api/v1/compliance/reports');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
