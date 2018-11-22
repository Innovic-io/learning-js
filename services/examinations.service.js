const uuid = require('uuid');

const { examinations } = require('../data.json');
const PetsService = require('./pets.service');
const { deepCopy } = require("../helpers/helpers.functions");

const petsService = new PetsService();

class ExaminationService{
    constructor(){}

    async getExaminations(){
        return examinations;
    }

    async getSingleExamination(examId){
        const singleExamination = examinations.find((el) => el.id === examId);
        return singleExamination;
    }

    async getExaminationsByPet(petId) {
        const pet = await petsService.getSinglePet(petId);
        const examinationsCopy = deepCopy(examinations);
        const examinationsByPet = examinationsCopy
            .filter((el) => el.petId === petId)
            .map((el) => {
                delete el.petId;
                return { ...el, pet};
            });
        return examinationsByPet;
    }

    async deleteSingleExamination(examId) {
        const index = examinations.findIndex((el) => el.id === examId);

        if(index > -1) {
            const [ deletedExam ] = examinations.splice(index, 1);
            return deletedExam;
        }
    }

    async addSingleExamination(newExamination) {
        const copy = deepCopy(newExamination)
        const newPetId = copy.petId;
        const pet = await petsService.getSinglePet(newPetId);

        if(pet !== undefined) {
            copy.id = uuid();
            examinations.push(copy);
            return copy;
        }
    }
}


module.exports = ExaminationService;
