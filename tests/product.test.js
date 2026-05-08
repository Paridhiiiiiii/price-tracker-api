const request = require('supertest');
const app = require('../server');

let token = '';

beforeAll(async () => {
  const res = await request(app)
    .post('/api/auth/login')
    .send({ email: 'test@test.com', password: 'test123' });
  token = res.body.token;
});

describe('Products API', () => {
  it('should reject adding product without auth', async () => {
    const res = await request(app)
      .post('/api/products/add')
      .send({ name: 'iPhone', url: 'https://amazon.in/...', currentPrice: 79999 });
    expect(res.statusCode).toBe(401);
  });

  it('should add a product with valid token', async () => {
    const res = await request(app)
      .post('/api/products/add')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Test Phone', url: 'https://amazon.in/test', currentPrice: 15000 });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
  });

  it('should get all products', async () => {
    const res = await request(app)
      .get('/api/products')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});