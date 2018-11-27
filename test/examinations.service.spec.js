require('mocha');
const assert = require('assert');

const ExaminationsService = require('../services/examinations.service');
const { examinations, pets } = require('../data');
const { deepCopy } = require('../helpers/helpers.functions')

describe('Unit test for examination service', () => {
    let examinationsService;
    beforeEach(() => {
        examinationsService = new ExaminationsService(examinations);
    });

    it('should get all examinations', async () => {
        const exp =  await examinationsService.getExaminations();
        assert.deepStrictEqual(exp, examinations);
    });

    it('should get single examination when id is right', async () => {
        const examId = examinations.find((el) => el.id);

        const index = examinations.findIndex((el) => el.id === examId);
        const singleExam = await examinationsService.getSingleExamination(examId);

        assert.deepStrictEqual(examinations[index], singleExam);
    });

    it('should return undefined when id is wrong', async () => {
        const examId = examinations.find((el) => !el.id)

        const singleExamination = await examinationsService.getSingleExamination(examId);

        assert.strictEqual(undefined, singleExamination);
    });

    it('should get all examinations by pet when pet id is right', async () => {
        const { petId } = examinations.find((el) => el.petId);

        const examinationsByPet = await examinationsService.getExaminationsByPet(petId)
        const expectedExaminationsByPet =  deepCopy(examinations.find((el) => el.petId === petId));
        expectedExaminationsByPet.pet = pets.find((el) => el.id === petId);
        delete expectedExaminationsByPet.petId;

        assert.deepStrictEqual(examinationsByPet, [ expectedExaminationsByPet ]);
    });

    it('should return undefined examinations by pet when id is wrong', async () => {
        const petId = examinations.find((el) => !el.petId);

        const examinationsByPet = await examinationsService.getExaminationsByPet(petId);
        assert.strictEqual(examinationsByPet, undefined);
    });

    it('should delete examination properly when id is right', async () => {
        const examination = examinations.find((el) => el)
        const examId = examination.id;

        const delExam = await examinationsService.deleteSingleExamination(examId);
        const index = examinations.findIndex((el) => el.id === examId);

        assert.deepStrictEqual(delExam, examination);
        assert.strictEqual(index, -1);

        const delExam2 = await examinationsService.deleteSingleExamination(examId);
        assert.strictEqual(delExam2, undefined)
    });

    it('should not delete anything and return undefined examination when id is wrong', async () => {

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