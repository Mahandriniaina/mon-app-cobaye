const request = require('supertest');
const app = require('../app');

describe('Tests de mon application CI/CD', () => {
  // Test de la route principale
  test('GET / should return welcome message', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toContain('Hello from my CI/CD Pipeline');
  });

  // Test de la route de santé
  test('GET /health should return status OK', async () => {
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('OK');
    expect(response.body.service).toBe('mon-app-cobaye');
  });

  // Test de la route API
  test('GET /api/users should return users list', async () => {
    const response = await request(app).get('/api/users');
    expect(response.statusCode).toBe(200);
    expect(response.body.users).toHaveLength(2);
    expect(response.body.count).toBe(2);
  });

  // Test de gestion d'erreur
  test('GET /api/error should return 500 error', async () => {
    const response = await request(app).get('/api/error');
    expect(response.statusCode).toBe(500);
    expect(response.body.error).toBeDefined();
  });
});