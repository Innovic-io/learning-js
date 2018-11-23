require('mocha');
const assert = require('assert');

const PetsService = require('../services/pets.service');
const { pets } = require('../data');

describe('Unit test for pets service', () => {
    beforeEach(() => {
        petsService = new PetsService(pets);
    })

    it('should get all pets', async () => {
        assert.strictEqual(petsService.getPets() instanceof Promise, true);

        const getPets = await petsService.getPets();
        assert(getPets, pets);
    });

    it('should get single pet', async () => {
        assert.strictEqual(petsService.getSinglePet(213) instanceof Promise, true);

        const singlePetWrong = await petsService.getSinglePet();

        assert.deepEqual(singlePetWrong, undefined);

        const petId = '5adjw001';
        const singlePetRight = await petsService.getSinglePet(petId);
        const singlePetIndex = pets.findIndex((el) => el.id = petId);

        assert.deepEqual(singlePetRight, pets[singlePetIndex])
    });

    it('should add new pet', async () => {
        assert.strictEqual(petsService.addSinglePet({}) instanceof Promise, true);

        const np = {
            "name" : "Grfo",
            "tags" : 2,
            "status" : "alive",
            "breed": "Boxeasddsr",
            "age": 1
        };

        const newPet = await petsService.addSinglePet(np);
        const { id } = newPet;

        assert.deepEqual(typeof id, 'string');
        assert.deepEqual(pets[pets.length-1], newPet);
        assert.notDeepStrictEqual(newPet, pets);
    });

    it('should delete single pet', async () => {
        assert.strictEqual(petsService.deleteSinglePet(231) instanceof Promise, true);

        const petId = '5adjw001';
        const pet = pets.find((el) => el.id === petId);
        const delPet = await petsService.deleteSinglePet(petId);
        const petIndex = pets.findIndex((el) => el.id === petId);
        assert.deepStrictEqual(pet, delPet);
        assert.strictEqual(petIndex, -1);
    });

    it('should update single pet', async () => {
        const petId = '5adjw002';
        const body = {
            owner: 'Pejr',
            age: 2.7
        };
        const pet = pets.find((el) => el.id === petId);
        const updatedPet = await petsService.updateSinglePet(petId, body);
        assert.deepStrictEqual(pet, updatedPet);
    });

});