const request = require('supertest');

const app = require('../../src/app');

describe('DELETE /v1/fragments/:id', () => {
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
    request(app)
      .delete('/v1/fragments/' + id)
      .expect(401));

  // If the wrong username/password pair are used (no such user), it should be forbidden
  test('incorrect credentials are denied', () =>
    request(app)
      .delete('/v1/fragments/' + id)
      .auth('invalid@email.com', 'incorrect_password')
      .expect(401));

  test('id not in database throws 404', () =>
    request(app)
      .delete('/v1/fragments/x1' + id)
      .auth(user, password)
      .expect(404));

  test('valid credentials and id succeeds deleting and returns 200 status code and ok status in body', () =>
    request(app)
      .delete('/v1/fragments/' + id)
      .auth(user, password)
      .expect((res) => {
        expect(res.body.status).toBe('ok');
        expect(res.statusCode).toBe(200);
      }));
});
