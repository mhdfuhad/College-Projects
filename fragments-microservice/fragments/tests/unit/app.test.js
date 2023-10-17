// tests/unit/app.test.js

const request = require('supertest');

const app = require('../../src/app');

describe('App initialization and setup', () => {
  test('unknown route returns a 404', () => request(app).get('/unknownIguess').expect(404));
});
