import request from 'supertest';
import app, { server } from './main';

describe('GET /api', () => {
  afterAll((done) => {
    server.close((err) => {
      if (err) {
        console.error('Error closing the server:', err);
        done(err);
      } else {
        console.log('Test server closed');
        done();
      }
    });
  });

  it('should return a 200 status', async () => {
    const response = await request(app).get('/api');
    expect(response.status).toBe(200);
  });
});
