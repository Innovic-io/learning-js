require('mocha');
const assert = require('assert');
const request = require('supertest');
const app = require('../server');

const { users } = require('../data');


describe('Unit test for login controller', () => {
  it('should get the token if name and password is valid', async () => {
    const body = users.find((el) => el);
    const res = await request(app)
      .post("/login")
      .send(body)
      .expect(200);

    assert.strictEqual(res.body.auth, true);
    assert.notStrictEqual(res.body.token, undefined);
  });

});
