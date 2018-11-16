const ExaminationsService = require('../services/examinations.service');

let examinationsService;

class ExaminationsController{
    constructor() {
        examinationsService = new ExaminationsService();
    }

    async getExaminations(req, res) {
        const examinations = await examinationsService.getExaminations();
        res.status(200).json(examinations);
    }

    async getSingleExamination(req, res) {
        const { examId }= req.params;
        const singleExamination = await examinationsService.getSingleExamination(examId);

        res.status(200).json(singleExamination);
    }

    async getExaminationsByPet (req, res) {
        const petId = req.params.petId;
        const examinationsByPet = await examinationsService.getExaminationsByPet(petId);

        res.status(200).json(examinationsByPet);
    }

    async deleteSingleExamination(req, res) {
        const examId = req.params.examId;
        const deletedExamination = await examinationsService.deleteSingleExamination(examId);
        console.log(deletedExamination);

        if(deletedExamination) {
            res.status(200).json(deletedExamination);
        } else {
            res.status(400).json({error: 'Examination does not exist!'});
        }
    }

    async addSingleExamination(req, res) {
        const newExamination = req.body;
        const serviceResponse = await examinationsService.addSingleExamination(newExamination);

        res.status(201).json(serviceResponse);
    }
}

module.exports = ExaminationsController;