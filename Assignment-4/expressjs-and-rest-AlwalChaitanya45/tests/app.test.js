const request = require('supertest');
const app = require('../app');

describe('Profile API', () => {
  let profileId;

  it('POST /api/profiles - Create profile', async () => {
    const res = await request(app).post('/api/profiles').send({
      name: 'Alice',
      favoriteColor: 'Blue',
      favoriteFood: 'Pizza'
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    profileId = res.body.id;
  });

  it('GET /api/profiles - Should return list of profiles', async () => {
    const res = await request(app).get('/api/profiles');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('PATCH /api/profiles/:id/likes - Should increment likes', async () => {
    const res = await request(app).patch(`/api/profiles/${profileId}/likes`);
    expect(res.statusCode).toBe(200);
  });

  it('GET /api/profiles/:id - Should return one profile', async () => {
    const res = await request(app).get(`/api/profiles/${profileId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('name', 'Alice');
  });

  it('PUT /api/profiles/:id - Should update profile fully', async () => {
    const res = await request(app).put(`/api/profiles/${profileId}`).send({
      name: 'Alice Updated',
      favoriteColor: 'Red',
      favoriteFood: 'Burgers',
      likes: 10
    });
    expect(res.statusCode).toBe(200);
  });

  it('DELETE /api/profiles/:id - Should delete profile', async () => {
    const res = await request(app).delete(`/api/profiles/${profileId}`);
    expect(res.statusCode).toBe(200);
  });

  it('GET /api/profiles/:id - Should return 404 after delete', async () => {
    const res = await request(app).get(`/api/profiles/${profileId}`);
    expect(res.statusCode).toBe(404);
  });
}); 