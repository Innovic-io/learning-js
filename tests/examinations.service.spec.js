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
    assert.deepEqual(typeof id, "string")
    assert.deepEqual(newExam, {...objToAdd, id})
    assert.deepEqual(examinations[4], newExam)
}

expect();

