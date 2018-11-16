const { examinations } = require('../data.json');
const PetsService = require('./pets.service');
const uuid = require('uuid');

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
        const pets = await petsService.getPets();
        const examinationsByPet = examinations.filter((el) => el.petId === petId);
        const pet = pets.find((el) => el.id === petId);
        const index = examinations.findIndex((el) => el.petId === petId);

        if(index >= 0) {
            examinationsByPet[index].pet = pet;
        }
        return examinationsByPet;
    }

    async deleteSingleExamination(examId) {
        const index = examinations.findIndex((el) => el.id === examId);
        if(index > -1) {
            examinations.splice(index, 1);
        }
        return examinations[index];
    }

    async addSingleExamination(newExamination) {
        newExamination.id = uuid();
        examinations.push(newExamination);
        return newExamination;
    }

}

module.exports = ExaminationService;
