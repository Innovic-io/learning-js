const assert = require('assert');
const ExaminationsService = require('../services/examinations.service');
const { examinations } = require('../data');

const examinationsService = new ExaminationsService();

const expect = async () => {
    const exp =  await examinationsService.getExaminations() ;
    assert.deepEqual(exp, examinations);

    const objToAdd = {
        petId: "5adjw003",
        description: "Run 123",
        scheduleTime: "2018-10-13 17:00:00"
    };
    const newExam = await examinationsService.addSingleExamination(objToAdd)

    const { id } = newExam;
    assert.deepEqual(typeof id, "string");
    assert.deepStrictEqual(newExam, {...objToAdd, id});
    assert.notDeepStrictEqual(newExam, objToAdd);
    assert.deepEqual(examinations[4], newExam);

    const examId = '23jkk20';
    const element = examinations.find((el) => el.id === examId)
    const delExam = await examinationsService.deleteSingleExamination(examId);
    const index = examinations.findIndex((el) => el.id === examId)


    assert.deepStrictEqual(delExam, element);
    assert.strictEqual(index, -1);

    const delExam2 = await examinationsService.deleteSingleExamination(examId);

    assert.strictEqual(delExam2, undefined)


};

expect();

