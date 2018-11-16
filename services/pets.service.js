const { pets } = require('../data.json');
const uuid = require('uuid');


class PetService {
    constructor(){}

    getPets (){
        return pets;
    };

    getSinglePet (petId) {
        const singlePet = pets.find((el) => el.id === petId);
        return singlePet;
    };

    deleteSinglePet(petId) {
        const index = pets.findIndex((el) => el.id === petId);

        if(index > -1) {
            const deletedPet = pets[index];
            pets.splice(index, 1);
            return deletedPet;
        }
    }

    addSinglePet(newPet) {
        newPet.id = uuid();
        pets.push(newPet);
        return newPet;
    }
}

module.exports = PetService;
