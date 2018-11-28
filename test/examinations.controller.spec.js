require('mocha');
const request = require('supertest');
const app = require('../server');
const assert = require('assert');
const { deepCopy } = require('../helpers/helpers.functions')

const { examinations, pets } = require('../data');

describe('Unit test for examination controller', () => {
    it('should get all examinations', async () => {
        const res = await request(app)
            .get('/examinations')
            .expect(examinations)
            .expect(200)
        assert.equal(res.body.length, examinations.length);
    });

    it('should get single examination if the ID is right', async () => {
        const existing = examinations.find((el) => el.id);
        const res = await request(app)
            .get(`/examination/${existing.id}`)
            .expect(200)

        assert.deepStrictEqual(res.body, existing);
    });

    it('should return an empty object if the ID is wrong', async () => {
        const examId = 2121232321321;
        const res = await request(app)
            .get(`/examination/${examId}`)
            .expect(204)
        assert.deepStrictEqual(res.body, {})
    });

    it('should get all examinations by pet if the pet ID is right', async () => {
        const newExaminations = deepCopy(examinations);

        const existing = newExaminations.find((el) => el.petId);
        const res = await request(app)
            .get(`/examinations/pet/${existing.petId}`)
            .expect(200);
        const expPet = existing.pet = pets.find((el) => el.id === existing.petId);
        existing.pet = expPet;
        delete(existing.petId);

        assert.deepStrictEqual(res.body, [ existing ]);
    });

    it('should return an empty objects if the ID is wrong', async () => {
        const notExisting = 34342433243;
        const res = await request(app)
            .get(`/examination/${notExisting}`)
            .expect(204);

        assert.deepStrictEqual(res.body, {})
    });

    it('should delete an examination if the ID is right', async () => {
        const existed = examinations.find((el) => el.id);
        const beforeLength = examinations.length;
        const res = await request(app)
            .delete(`/examination/${existed.id}`)
            .expect(200);
        const afterLength = examinations.length;

        assert.deepStrictEqual(existed, res.body);
        assert.notStrictEqual(beforeLength, afterLength);
    });

    it('should not delete anything if the ID is wrong', async () => {
        const notExisting = undefined;
        const res = await  request(app)
            .delete(`/examination/${notExisting}`)
            .expect(400);
        assert.deepStrictEqual(res.body, {error: 'Examination does not exist!'})
    });

    it('should add single examination', async () => {
        const oldExaminations = deepCopy(examinations);
        const examToAdd = {
            petId: '5adjw003',
            description: 'Eat',
            scheduleTime: '2018-10-13 17:00:00'
        };
        const res = await request(app)
            .post('/examination')
            .send(examToAdd)
            .expect(201);

        oldExaminations.push(res.body);
        assert.deepStrictEqual(examinations, oldExaminations)
    });

    it('should update single examination', async () => {
        const featureToAdd = {description: 'Trojo'};
        const existed = examinations.find((el) => el.id);
        const oldPet = deepCopy(existed);

        const res = await request(app)
            .put(`/examination/${existed.id}`)
            .send(featureToAdd)
            .expect(200);

        assert.notDeepStrictEqual(res.body, oldPet)
    });
});