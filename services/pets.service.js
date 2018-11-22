const uuid = require('uuid');

const { pets } = require('../data.json');
const { deepCopy } = require("../helpers/helpers.functions");


class PetsService {
    constructor(){}

    async getPets (){
        return pets;
    };

    async getSinglePet (petId) {
        const singlePet = pets.find((el) => el.id === petId);
        return singlePet;
    };

    async deleteSinglePet(petId) {
        const index = pets.findIndex((el) => el.id === petId);

        if(index > -1) {
            const deletedPet = pets[index];
            pets.splice(index, 1);
            return deletedPet;
        }
    }

    async addSinglePet(newPet) {
        const copy = deepCopy(newPet);
        copy.id = uuid();
        pets.push(copy);
        return copy;
    }
}

module.exports = PetsService;
