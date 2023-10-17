const request = require('supertest');

const app = require('../../src/app');
const hash = require('../../src/utils/hash');

describe('POST /v1/fragments', () => {
  const user = 'user1@email.com';
  const password = 'password1';

  // If the request is missing the Authorization header, it should be forbidden
  test('unauthenticated requests are denied', () => request(app).post('/v1/fragments').expect(401));

  // If the wrong username/password pair are used (no such user), it should be forbidden
  test('incorrect credentials are denied', () =>
    request(app).post('/v1/fragments').auth('invalid@email.com', 'incorrect_password').expect(401));

  test('incorrect type is denied and returned status error', async () => {
    const res = await request(app)
      .post('/v1/fragments')
      .auth(user, password)
      .set('Content-Type', 'application/msword')
      .send('hello');

    expect(res.statusCode).toBe(415);
    expect(res.body.status).toBe('error');
  });

  test('empty data is denied', () =>
    request(app)
      .post('/v1/fragments')
      .auth(user, password)
      .set('Content-Type', 'text/plain')
      .expect(406));

  test('valid data with no content type errors with 415', () =>
    request(app).post('/v1/fragments').auth(user, password).send('hello').expect(415));

  test('valid data with valid content type succeeds', () =>
    request(app)
      .post('/v1/fragments')
      .auth(user, password)
      .set('Content-Type', 'text/plain')
      .send('hello')
      .expect(201));

  test('valid data with valid content type gets a location header', async () => {
    const res = await request(app)
      .post('/v1/fragments')
      .auth(user, password)
      .set('Content-Type', 'text/plain')
      .send('hello');

    expect(res.header.location).toBeDefined();
  });

  test('valid data with valid content type gets a fragment object in response and status ok', async () => {
    const res = await request(app)
      .post('/v1/fragments')
      .auth(user, password)
      .set('Content-Type', 'text/plain')
      .send('hello');

    expect(res.body.status).toBe('ok');
    expect(res.body.fragment).toBeDefined();
    expect(res.body.fragment.id).toBeDefined();
    expect(res.body.fragment.ownerId).toBe(hash(user)); // Check that the ownerId is correct
    expect(res.body.fragment.created).toBeDefined();
    expect(res.body.fragment.updated).toBeDefined();
    expect(res.body.fragment.type).toBe('text/plain'); // Check that the type is correct
    expect(res.body.fragment.size).toBe(5); // Check that the size is correct
  });

  test('application/json type data can be saved as a fragment', async () => {
    const res = await request(app)
      .post('/v1/fragments')
      .auth(user, password)
      .set('Content-Type', 'application/json')
      .send({
        type: 'application/json',
        data: {
          hello: 'world',
        },
      });

    expect(res.body.fragment.type).toBe('application/json'); // Check that the type is correct
  });

  test('text/html type data can be saved as a fragment', async () => {
    const res = await request(app)
      .post('/v1/fragments')
      .auth(user, password)
      .set('Content-Type', 'text/html')
      .send('<html><body>Hello World</body></html>');

    expect(res.body.fragment.type).toBe('text/html'); // Check that the type is correct
  });

  test('text/markdown type data can be saved as a fragment', async () => {
    const res = await request(app)
      .post('/v1/fragments')
      .auth(user, password)
      .set('Content-Type', 'text/markdown')
      .send('# Hello World');

    expect(res.body.fragment.type).toBe('text/markdown'); // Check that the type is correct
  });
});
