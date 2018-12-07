require('mocha');
const assert = require('assert');

const ExaminationsService = require('../services/examinations.service');
const { getKeys } = require("../helpers/helpers.functions");
const { PET_EXIST_ERROR } = require("../helpers/constants");
const { examinations, pets } = require('../data');
const { deepCopy } = require('../helpers/helpers.functions');

describe('Unit test for examination service', () => {
    let examinationsService;
    let examinationsCopy;

    beforeEach(() => {
        examinationsCopy = deepCopy(examinations)
        examinationsService = new ExaminationsService(examinationsCopy);
    });

    describe('GET testing', () => {

        it('should get all examinations', async () => {
            const exp =  await examinationsService.getExaminations();
            assert.deepStrictEqual(exp, examinationsCopy);
        });

        it('should get only desired fields of an examinations', async () => {
            const query = { fields: 'description' };
            const actual = await examinationsService.getExaminations(query);
            const expected = examinationsCopy.map((el) => getKeys(el, query.fields));
            
            assert.deepStrictEqual(actual, expected)
        });

        it('should get single examination if id is right', async () => {
            const examId = examinationsCopy.find((el) => el.id);

            const index = examinationsCopy.findIndex((el) => el.id === examId);
            const singleExam = await examinationsService.getSingleExamination(examId);

            assert.deepStrictEqual(examinationsCopy[index], singleExam);
        });

        it('should return undefined if id is wrong', async () => {
            const examId = examinationsCopy.find((el) => !el.id);

            const singleExamination = await examinationsService.getSingleExamination(examId);

            assert.strictEqual(undefined, singleExamination);
        });

        it('should get all examinations by pet if pet id is right', async () => {
            const { petId } = examinationsCopy.find((el) => el.petId);

            const examinationsByPet = await examinationsService.getExaminationsByPet(petId);
            const expectedExaminationsByPet =  examinationsCopy.filter((el) => el.petId === petId);

            expectedExaminationsByPet
                .map((el) => {
                    el.pet = pets.find((el) => el.id === petId);
                    delete el.petId
                });

            assert.deepStrictEqual(examinationsByPet, expectedExaminationsByPet );
        });

        it('should return undefined examinations by pet if id is wrong', async () => {
            const petId = 3242334324;

            const examinationsByPet = await examinationsService.getExaminationsByPet(petId);
            assert.strictEqual(examinationsByPet, undefined);
        });
    });

    describe('DELETE testing', () => {

        it('should delete examination properly if id is right', async () => {
            const examination = examinationsCopy.find((el) => el);
            const examId = examination.id;

            const delExam = await examinationsService.deleteSingleExamination(examId);
            const index = examinationsCopy.findIndex((el) => el.id === examId);

            assert.deepStrictEqual(delExam, examination);
            assert.strictEqual(index, -1);

            const delExam2 = await examinationsService.deleteSingleExamination(examId);
            assert.strictEqual(delExam2, undefined)
        });

        it('should not delete anything and return undefined examination if id is wrong', async () => {
            const newExaminations = deepCopy(examinations);
            const wrongId = newExaminations.find((el) => !el.id);

            const delExam = await examinationsService.deleteSingleExamination(wrongId);

            assert.deepStrictEqual(newExaminations, examinationsCopy);
            assert.strictEqual(delExam, undefined);
        });
    });

    describe('CREATE testing', () => {

        it('should add new examination properly if the pet ID is right' , async () => {
            const objToAdd = {
                petId: "5adjw003",
                description: "Mangia",
                scheduleTime: "2018-10-13 15:00:00"
            };
            const newExam = await examinationsService.addSingleExamination(objToAdd);

            const { id } = newExam;

            assert.strictEqual(typeof id, 'string');
            assert.deepStrictEqual(newExam, {...objToAdd, id});
            assert.deepEqual(examinationsCopy[examinationsCopy.length - 1], newExam);
        });

        it('should not add new examination if pet ID is wrong', async () => {
            const objToAdd = {
                petId: "as",
                description: "Mangia",
                scheduleTime: "2018-10-13 15:00:00"
            };
            await examinationsService.addSingleExamination(objToAdd)
                .catch((error) => assert.deepStrictEqual(error, PET_EXIST_ERROR));

        });
    });

    describe('UPDATE testing', () => {

        it('should update examination when id is right', async () => {
            const examId = examinationsCopy.find((el) => el).id;
            const body = {
                description: 'Eateat'
            };

            const examination = examinationsCopy.find((el) => el.id === examId);
            const updatedExamination = await examinationsService.updateSingleExamination(examId, body);

            assert.deepStrictEqual(examination, updatedExamination);
        });

        it('should not update anything when id is wrong', async () => {
            const examId = 23432432432;
            const body = {
                description: 'Mangia, mangia'
            };
            const newExaminations = deepCopy(examinationsCopy);
            await examinationsService.updateSingleExamination(examId, body);

            assert.deepStrictEqual(newExaminations, examinationsCopy);
        });
    });
});