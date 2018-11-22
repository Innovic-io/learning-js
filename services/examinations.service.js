const uuid = require('uuid');
const { examinations } = require('../data.json');
const PetsService = require('./pets.service');
const { deepCopy } = require("../helpers/helpers.functions");
const { addIdPushAndReturn } = require('../helpers/helpers.functions')

const petsService = new PetsService();

class ExaminationService{
    constructor(sentExaminations) {
        this.serviceExaminations = sentExaminations || examinations;
    }

    async getExaminations(){
        return this.serviceExaminations;
    }

    async getSingleExamination(examId){
        const singleExamination = this.serviceExaminations.find((el) => el.id === examId);
        return singleExamination;
    }

    async getExaminationsByPet(petId) {
        const pet = await petsService.getSinglePet(petId);
        const examinationsCopy = deepCopy(this.serviceExaminations);
        const examinationsByPet = examinationsCopy
            .filter((el) => el.petId === petId)
            .map((el) => {
                delete el.petId;
                return { ...el, pet};
            });
        return examinationsByPet;
    }

    async deleteSingleExamination(examId) {
        const index = this.serviceExaminations.findIndex((el) => el.id === examId);

        if(index > -1) {
            const [ deletedExam ] = this.serviceExaminations.splice(index, 1);
            return deletedExam;
        }
    }

    async addSingleExamination(newExamination) {
        const newPetId = newExamination.petId;
        const pet = await petsService.getSinglePet(newPetId);

        if(pet !== undefined) {
            return addIdPushAndReturn(newExamination, this.serviceExaminations);
        }
    }
}


module.exports = ExaminationService;
