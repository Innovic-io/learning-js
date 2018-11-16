const { examinations: examinationsService, pets } = require('../data.json');
const uuid = require('uuid');

class ExaminationService{
    constructor(){}

    getExaminations(req, res) {
        res.status(200).json(examinationsService);
    }

    getSingleExamination(req, res){
       const { examId } = req.params;
       const exam = examinationsService.find((el) => el.id === examId);
       const pet = pets.find((el) => el.id === exam.petId);
       delete exam.petId;
       exam.pet = pet;


       res.status(200).json(exam);
    }

    getExaminationsByPet(req, res){
        const { petId } = req.params;
        const pet = pets.find((el) => el.id === petId);
        const exams = examinationsService.filter((el) => el.petId === petId);
        res.status(200).json(exams);
    }

    deleteExamination(req, res) {
        const examId = req.params.examId;
        const indexExam = examinationsService.findIndex((el) => el.id === examId);
        if(indexExam > -1){
            examinationsService.splice(indexExam, 1);
        }
        console.log(indexExam);
        res.status(200).json(examinationsService);
    }

    addExamination(req, res){
        const newExam = req.body;
        newExam.id = uuid();

        examinationsService.push(newExam);
        res.status(201).json(examinationsService);
    }
}

module.exports = ExaminationService;
