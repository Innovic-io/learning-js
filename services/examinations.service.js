const { examinations } = require('../data.json');
const PetsService = require('./pets.service');
const uuid = require('uuid');

const petsService = new PetsService();

class ExaminationService{
    constructor(){}

    getExaminations(){
        return examinations;
    }

    getSingleExamination(examId){
        const singleExamination = examinations.find((el) => el.id === examId);
        return singleExamination;
    }

    getExaminationsByPet(petId) {
        const pets = petsService.getPets();
        const examinationsByPet = examinations.filter((el) => el.petId === petId);
        const pet = pets.find((el) => el.id === petId);
        const index = examinations.findIndex((el) => el.petId === petId);
        examinationsByPet[index].pet = pet;
        return examinationsByPet;
    }

    deleteSingleExamination(examId) {
        const index = examinations.findIndex((el) => el.id === examId);
        if(index > -1) {
            examinations.splice(index, 1);
        }
        return examinations[index];
    }

    addSingleExamination(newExamination) {
        examinations.push(newExamination);
        newExamination.id = uuid();
        return newExamination;
    }

}

module.exports = ExaminationService;
