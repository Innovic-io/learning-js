const { examinations } = require('../data.json');
const PetsService = require('./pets.service');
const { deepCopy } = require("../helpers/helpers.functions");
const { addIdPushAndReturn } = require('../helpers/helpers.functions');

const petsService = new PetsService();

class ExaminationService{
    constructor(sentExaminations) {
        this.serviceExaminations = sentExaminations || examinations;
    }

    async getExaminations(){
        return this.serviceExaminations;
    }

    async getSingleExamination(examId){
        return this.serviceExaminations.find((el) => el.id === examId);
    }

    async getExaminationsByPet(petId) {
        const pet = await petsService.getSinglePet(petId);
        if (pet) {
            const examinationsCopy = deepCopy(this.serviceExaminations);
            return examinationsCopy
                .filter((el) => el.petId === petId)
                .map((el) => {
                    delete el.petId;
                    return {...el, pet};
                });
        }
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

        if(pet) {
            return addIdPushAndReturn(newExamination, this.serviceExaminations);
        } else {
            throw { error: 'Pet with that ID does not exist.' } ;
        }
    }

    async updateSingleExamination(examId, body) {
        const examination = this.serviceExaminations.find((el) => el.id === examId);
        return examination && Object.assign(examination, body);
    }
}


module.exports = ExaminationService;
