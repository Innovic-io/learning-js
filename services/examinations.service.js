const { examinations } = require('../data.json');
const PetsService = require('./pets.service');
const { deepCopy } = require("../helpers/helpers.functions");
const { addIdPushAndReturn, getKeys } = require('../helpers/helpers.functions');

const petsService = new PetsService();

class ExaminationService{
    constructor(sentExaminations) {
        this.serviceExaminations = sentExaminations || examinations;
    }

    async getExaminations(query) {
        let solution = deepCopy(this.serviceExaminations);

        if (query.fields) {
            solution = solution
                .map((element) => getKeys(element, query.fields.split(',')));
        }
        if(query.sort) {
            solution.sort((a, b) => a[query.sort].toString().localeCompare(b[query.sort].toString()))
        }

        console.log(getLength(query));
        return solution.slice(...getLength(query));
    }

    async getSingleExamination(examId, query) {
        let singleExamination = this.serviceExaminations.find((el) => el.id === examId);

        if(query.fields) {
            singleExamination = Object.assign({}, ...Object
                .keys(singleExamination)
                .filter((el) => query.fields.split(',').includes(el))
                .map((el) => ({[el]: singleExamination[el]})))
        }

        return singleExamination;
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

    async deleteSingleExamination(examId, query) {
        const index = this.serviceExaminations.findIndex((el) => el.id === examId);

        if(index > -1) {
            let [ deletedExam ] = this.serviceExaminations.splice(index, 1);
            if(query.fields) {
                deletedExam = Object.assign({}, ...Object
                    .keys(deletedExam)
                    .filter((el) => query.fields.includes(el))
                    .map((el) => ({ [el]: deletedExam[el]})))
            }
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

const getLength = ({ skip, offset }) => {
    const result = [+skip || 0];
    if (offset) {
        result.push((+skip || 0) + (+offset || 0));
    }

    return result;
};