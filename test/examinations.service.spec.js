require('mocha');
const assert = require('assert');

const ExaminationsService = require('../services/examinations.service');
const { examinations } = require('../data');

describe('Unit test for examination service', () => {
    let examinationsService;
    beforeEach(() => {
        examinationsService = new ExaminationsService(examinations);
    });

    it('should get all examinations', async () => {
        const exp =  await examinationsService.getExaminations();
        assert.deepStrictEqual(exp, examinations);
    });

    it('should get single examination', async () => {
        const examId = '5adjw003';
        const index = examinations.findIndex((el) => el.id === examId);
        const singleExam = await examinationsService.getSingleExamination(examId);
        assert.deepStrictEqual(examinations[index], singleExam);
    });

    it('should update examination', async () => {
        const examId = '23jkk20';
        const body = {
            description: 'Eateat'
        };

        const examination = examinations.find((el) => el.id === examId);
        const updatedExamination = await examinationsService.updateSingleExamination(examId, body);
        assert.deepStrictEqual(examination, updatedExamination);
    });

    it('should delete examination properly', async () => {
        const examId = '23jkk20';
        const element = examinations.find((el) => el.id === examId);
        const delExam = await examinationsService.deleteSingleExamination(examId);
        const index = examinations.findIndex((el) => el.id === examId);
        assert.deepStrictEqual(delExam, element);
        assert.strictEqual(index, -1);
        const delExam2 = await examinationsService.deleteSingleExamination(examId);
        assert.strictEqual(delExam2, undefined)
    });

    it('should add new examination properly', async () => {
        const objToAdd = {
            petId: "5adjw003",
            description: "Run 123",
            scheduleTime: "2018-10-13 17:00:00"
        };
        const newExam = await examinationsService.addSingleExamination(objToAdd);

        const { id } = newExam;
        assert.strictEqual(typeof id, 'string');
        assert.deepStrictEqual(newExam, {...objToAdd, id});
        assert.notDeepStrictEqual(newExam, objToAdd);
        assert.deepEqual(examinations[examinations.length - 1], newExam);
    })

});