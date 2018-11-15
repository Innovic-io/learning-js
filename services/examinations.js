const data = require('../data.json');
const uuid = require('uuid');
const examinations = data.examinations;
const pets = data.pets;

class ExaminationService{
    constructor(){}

    getExaminations(req, res) {
        res.status(200).json(examinations);
    }

    getExamination(req, res){
       const { examId } = req.params;
       const exam = examinations.find((el) => el.id === examId);
       const pet = pets.find((el) => el.id === exam.petId);
       delete exam.petId;
       exam.pet = pet;


       res.status(200).json(exam);
    }

    getPetExaminations(req, res){
        const { petId } = req.params;
        const pet = pets.find((el) => el.id === petId);
        const exams = examinations.filter((el) => el.petId === petId);
        exams.push(pet);
        res.status(200).json(exams);
    }

    deleteExamination(req, res) {
        const examId = req.params.examId;
        const indexExam = examinations.findIndex((el) => el.id === examId);
        if(indexExam > -1){
            examinations.splice(indexExam, 1);
        }
        console.log(indexExam);
        res.status(200).json(examinations);
    }

    postExamination(req, res){
        const newExam = req.body;
        newExam.id = uuid();

        examinations.push(newExam);
        res.status(200).json(examinations);
    }




}

module.exports = ExaminationService;