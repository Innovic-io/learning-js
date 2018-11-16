const ExaminationsService = require('../services/examinations.service');

let examinationsService;

class ExaminationsController{
    constructor() {
        examinationsService = new ExaminationsService();
    }

    getExaminations(req, res) {
        const examinations = examinationsService.getExaminations();
        res.status(200).json(examinations);
    }

    getSingleExamination(req, res) {
        const { examId }= req.params;
        const singleExamination = examinationsService.getSingleExamination(examId);

        res.status(200).json(singleExamination);
    }

    getExaminationsByPet (req, res) {
        const petId = req.params.petId;
        const examinationsByPet = examinationsService.getExaminationsByPet(petId);

        res.status(200).json(examinationsByPet);
    }

    deleteSingleExamination(req, res) {
        const examId = req.params.examId;
        const deletedExamination = examinationsService.deleteSingleExamination(examId);
        console.log(deletedExamination);

        if(deletedExamination) {
            res.status(200).json(deletedExamination);
        } else {
            res.status(400).json({error: 'Examination does not exist!'});
        }
    }

    addSingleExamination(req, res) {
        const newExamination = req.body;
        const serviceResponse = examinationsService.addSingleExamination(newExamination);

        res.status(201).json(serviceResponse);
    }
}

module.exports = ExaminationsController;