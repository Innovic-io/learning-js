require('mocha');
const request = require('supertest');
const app = require('../server');
const assert = require('assert')

const { examinations } = require('../data');

describe('Unit test for examination controller', () => {
    it('should get all examinations', async () => {
        const res = await request(app)
            .get('/examinations')
            .expect(200)
        assert.equal(res.body.length, examinations.length);
    });
});