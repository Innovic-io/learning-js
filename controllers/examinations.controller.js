const ExaminationsService = require('../services/examinations.service');
const { EXAMINATION_EXIST_ERROR } = require("../helpers/constants");

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

        if(singleExamination !== undefined) {
            res.status(200).json(singleExamination);
        } else {
            res.status(204).json(singleExamination);
        }
    }

    async getExaminationsByPet (req, res) {
        const examinationsByPet = await examinationsService.getExaminationsByPet(req.params.petId);

        if(examinationsByPet !== undefined) {
            res.status(200).json(examinationsByPet);
        } else {
            res.status(204).json(examinationsByPet);
        }
    }

    async deleteSingleExamination(req, res) {
        const deletedExamination = await examinationsService.deleteSingleExamination(req.params.examId);

        if(deletedExamination) {
            res.status(200).json(deletedExamination);
        } else {
            res.status(400).json(EXAMINATION_EXIST_ERROR);
        }
    }

    async addSingleExamination(req, res) {
        try {
            const serviceResponse = await examinationsService.addSingleExamination(req.body);

            if(serviceResponse) {
                res.status(201).json(serviceResponse);
            }
        }
         catch(err) {
            res.status(400).json(err)
        }
    }

    async updateSingleExamination(req, res) {
        try {
            const updateResponse = await examinationsService.updateSingleExamination(req.params.examId, req.body);

            res.status(200).json(updateResponse);
        } catch (error) {
            res.status(400).json(error)
        }
    }
}

module.exports = ExaminationsController;