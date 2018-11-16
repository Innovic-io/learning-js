const { pets } = require('../data.json');
const uuid = require('uuid');


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
        newPet.id = uuid();
        pets.push(newPet);
        return newPet;
    }
}

module.exports = PetsService;
