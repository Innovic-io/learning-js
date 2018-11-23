const ExaminationsService = require('../services/examinations.service')

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
        const singleExamination = await examinationsService.getSingleExamination(req.params.examId);

        res.status(200).json(singleExamination);
    }

    async getExaminationsByPet (req, res) {
        const examinationsByPet = await examinationsService.getExaminationsByPet(req.params.petId);

        res.status(200).json(examinationsByPet);
    }

    async deleteSingleExamination(req, res) {
        const deletedExamination = await examinationsService.deleteSingleExamination(req.params.examId);
        if(deletedExamination) {
            res.status(200).json(deletedExamination);
        } else {
            res.status(400).json({error: 'Examination does not exist!'});
        }
    }

    async addSingleExamination(req, res) {
        const serviceResponse = await examinationsService.addSingleExamination(req.body);

        res.status(201).json(serviceResponse);
    }

    async updateSingleExamination(req, res) {
        const updateResponse = await examinationsService.updateSingleExamination(req.params.examId, req.body);

        res.status(200).json(updateResponse);
    }
}

module.exports = ExaminationsController;