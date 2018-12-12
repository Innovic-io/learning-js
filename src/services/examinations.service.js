const { examinations } = require('../data.json');
const PetsService = require('./pets.service');
const { deepCopy } = require("../helpers/helpers.functions");
const { addIdPushAndReturn, getKeys, getLength } = require('../helpers/helpers.functions');

const petsService = new PetsService();

class ExaminationService{
    constructor(sentExaminations) {
        this.serviceExaminations = sentExaminations || examinations;
    }

    async getExaminations(query = {}) {
        let solution = deepCopy(this.serviceExaminations);

        if (query.fields) {
            solution = solution
                .map((element) => getKeys(element, query.fields));
        }
        if(query.sort) {
            if(query.sort[0] === '-'){
                const sortBy = query.sort.substr(1);
                solution.sort((a, b) => b[sortBy].toString().localeCompare(a[sortBy].toString()));
            } else {
                solution.sort((a, b) => a[query.sort].toString().localeCompare(b[query.sort].toString()))
            }
        }

        return solution.slice(...getLength(query));
    }

    async getSingleExamination(examId, query = {}) {
        let singleExamination = this.serviceExaminations.find((el) => el.id === examId);

        if(query.fields) {
           singleExamination = getKeys(singleExamination, query.fields);
          }

        return singleExamination;
    }

    async getExaminationsByPet(petId, query = {}) {
        const pet = await petsService.getSinglePet(petId);

        if (pet) {
            let examinationsCopy = deepCopy(this.serviceExaminations);

              examinationsCopy = examinationsCopy
                .filter((el) => el.petId === petId)
                .map((el) => {
                    delete el.petId;
                    return {...el, pet};
                });

            if(query.fields) {
                examinationsCopy = examinationsCopy
                    .map((el) => getKeys(el, query.fields));
            }

            if(query.sort) {
                if(query.sort[0] === '-') {
                    const sortBy = query.sort.slice(1);
                    examinationsCopy.sort((a, b) => b[sortBy].toString().localeCompare(a[sortBy].toString()))
                } else {
                    examinationsCopy.sort((a, b) => a[query.sort].toString().localeCompare(b[query.sort].toString()))
                }
            }

            return examinationsCopy.slice(...getLength(query));
        }
    }

    async deleteSingleExamination(examId, query = {}) {
        const index = this.serviceExaminations.findIndex((el) => el.id === examId);

        if(index > -1) {
            let [ deletedExam ] = this.serviceExaminations.splice(index, 1);
            if(query.fields) {
                deletedExam = getKeys(deletedExam, query.fields)
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

