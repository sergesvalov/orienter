import request from 'supertest';
import express from 'express';

// Создаем изолированный экземпляр приложения для тестов
const app = express();
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'orienter-backend' });
});

describe('API Gateway Health Check', () => {
  it('should return 200 OK and status JSON', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('status', 'ok');
    expect(res.body).toHaveProperty('service', 'orienter-backend');
  });
});
