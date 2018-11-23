const { addIdPushAndReturn } = require("../helpers/helpers.functions");

const { pets } = require('../data.json');


class PetsService {
    constructor(sentPets) {
        this.pets = sentPets || pets
    }

    async getPets (){
        return this.pets;
    };

    async getSinglePet (petId) {
        const singlePet = this.pets.find((el) => el.id === petId);
        return singlePet;
    };

    async deleteSinglePet(petId) {
        const index = this.pets.findIndex((el) => el.id === petId);

        if(index > -1) {
            const deletedPet = this.pets[index];
            this.pets.splice(index, 1);
            return deletedPet;
        }
    }

    async addSinglePet(newPet) {
        return addIdPushAndReturn(newPet, this.pets);
    }

    async updateSinglePet(petId, body) {
        const pet = this.pets.find((el) => el.id === petId);
        return pet && Object.assign(pet, body);
    }
}

module.exports = PetsService;
