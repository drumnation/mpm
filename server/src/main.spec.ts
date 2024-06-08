import request from 'supertest';
import app from './main';
import http from 'http';

let server: http.Server;

beforeAll((done) => {
  server = app.listen(3000, () => {
    console.log('Test server running on port 3000');
    done();
  });
});

afterAll((done) => {
  server.close(done);
});

describe('GET /api', () => {
  it('should return a 200 status', async () => {
    const response = await request(app).get('/api');
    expect(response.status).toBe(200);
  });
});
