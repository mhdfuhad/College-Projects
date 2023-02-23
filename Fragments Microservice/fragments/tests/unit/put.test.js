const request = require('supertest');

const app = require('../../src/app');

describe('PUT /v1/fragments/:id', () => {
  const user = 'user1@email.com';
  const password = 'password1';
  const type = 'text/plain';
  let id;

  beforeEach(async () => {
    const res = await request(app)
      .post('/v1/fragments')
      .auth(user, password)
      .set('Content-Type', type)
      .send('hello');

    id = res.body.fragment.id;
  });

  // If the request is missing the Authorization header, it should be forbidden
  test('unauthenticated requests are denied', () =>
    request(app).put(`/v1/fragments/${id}`).expect(401));

  // If the wrong username/password pair are used (no such user), it should be forbidden
  test('incorrect credentials are denied', () =>
    request(app)
      .put(`/v1/fragments/${id}`)
      .auth('invalid@email.com', 'incorrect_password')
      .expect(401));

  test('non existing fragment for id returns 404', () =>
    request(app)
      .put('/v1/fragments/invalid_id')
      .auth(user, password)
      .set('Content-Type', type)
      .send('hello')
      .expect(404));

  test('different content type is denied', () =>
    request(app)
      .put(`/v1/fragments/${id}`)
      .auth(user, password)
      .set('Content-Type', 'application/msword')
      .expect(400));

  test('no data sent in returns 406', () =>
    request(app)
      .put(`/v1/fragments/${id}`)
      .auth(user, password)
      .set('Content-Type', type)
      .expect(406));
});
