// tests/unit/get.test.js

const request = require('supertest');

const app = require('../../src/app');

const user = 'user1@email.com';
const password = 'password1';

describe('GET /v1/fragments', () => {
  // If the request is missing the Authorization header, it should be forbidden
  test('unauthenticated requests are denied', () => request(app).get('/v1/fragments').expect(401));

  // If the wrong username/password pair are used (no such user), it should be forbidden
  test('incorrect credentials are denied', () =>
    request(app).get('/v1/fragments').auth('invalid@email.com', 'incorrect_password').expect(401));

  // Using a valid username/password pair should give a success result with a .fragments array
  test('authenticated users get a fragments array', async () => {
    const res = await request(app).get('/v1/fragments').auth('user1@email.com', 'password1');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(Array.isArray(res.body.fragments)).toBe(true);
  });

  test('returns empty fragments array if user has no fragments', async () => {
    const res = await request(app).get('/v1/fragments').auth(user, password);
    expect(res.statusCode).toBe(200);
    expect(res.body.fragments.length).toBe(0);
  });

  test('returns an array with id of fragments', async () => {
    await request(app)
      .post('/v1/fragments')
      .auth(user, password)
      .set('Content-Type', 'text/plain')
      .send('hello');

    const res = await request(app).get('/v1/fragments').auth(user, password);
    expect(res.statusCode).toBe(200);
    expect(res.body.fragments.length).toBe(1);
  });

  test('returns an array with full fragments given expand is set to 1', async () => {
    await request(app)
      .post('/v1/fragments')
      .auth(user, password)
      .set('Content-Type', 'text/plain')
      .send('hello1');

    const res = await request(app).get('/v1/fragments?expand=1').auth(user, password);
    expect(res.statusCode).toBe(200);
    expect(res.body.fragments.length).toBe(2);
    expect(res.body.fragments[0]).toHaveProperty('id');
    expect(res.body.fragments[0]).toHaveProperty('ownerId');
    expect(res.body.fragments[0]).toHaveProperty('created');
    expect(res.body.fragments[0]).toHaveProperty('updated');
    expect(res.body.fragments[0]).toHaveProperty('type');
    expect(res.body.fragments[0]).toHaveProperty('size');
  });
});

describe('GET /v1/fragments/:id', () => {
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

  test('returns a 404 if the fragment does not exist', async () => {
    const res = await request(app).get('/v1/fragments/invalid').auth(user, password);
    expect(res.statusCode).toBe(404);
  });

  test('returns a 401 if the fragment does not belong to the user', async () => {
    const res = await request(app)
      .get(`/v1/fragments/${id}`)
      .auth('invalid@email.com', 'password1');
    expect(res.statusCode).toBe(401);
  });

  test('returns a 200 if the fragment belongs to the user', async () => {
    const res = await request(app).get(`/v1/fragments/${id}`).auth(user, password);
    expect(res.statusCode).toBe(200);
  });

  test('returns the correct data that was saved', async () => {
    const res = await request(app).get(`/v1/fragments/${id}`).auth(user, password);
    expect(res.text).toEqual('hello');
  });

  test('returns the correct data type by which the fragment was saved', async () => {
    const res = await request(app).get(`/v1/fragments/${id}`).auth(user, password);
    expect(res.type).toEqual(type);
  });

  test('extension to txt responds with data in text', async () => {
    const res = await request(app).get(`/v1/fragments/${id}.txt`).auth(user, password);
    expect(res.text).toEqual('hello');
  });

  test('extension to unknown type responds with 415', async () =>
    await request(app).get(`/v1/fragments/${id}.unknown`).auth(user, password).expect(415));
});

describe('GET /v1/fragments/:id/info', () => {
  const type = 'text/plain';
  let id;
  let fragment;
  beforeEach(async () => {
    const res = await request(app)
      .post('/v1/fragments')
      .auth(user, password)
      .set('Content-Type', type)
      .send('hello');

    id = res.body.fragment.id;
    fragment = res.body.fragment;
  });

  test('authenticated users get a fragment object given the correct id', async () => {
    const res = await request(app).get(`/v1/fragments/${id}/info`).auth(user, password);
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.fragment).toBeDefined();
  });

  test('authenticated users get a 404 given the id for a fragment that does not exist', async () => {
    const res = await request(app).get(`/v1/fragments/x1${id}/info`).auth(user, password);
    expect(res.statusCode).toBe(404);
    expect(res.body.status).toBe('error');
  });

  test('fragment data matches', async () => {
    const res = await request(app).get(`/v1/fragments/${id}/info`).auth(user, password);
    expect(res.body.fragment).toEqual(fragment);
  });
});
