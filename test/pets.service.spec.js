require('mocha');
const assert = require('assert');

const PetsService = require('../services/pets.service');
const { pets } = require('../data');
const { deepCopy } = require('../helpers/helpers.functions');

describe('Unit test for pets service', () => {
    let petsService;
    beforeEach(() => {
        petsService = new PetsService(pets);
    });

    it('should get all pets', async () => {
        assert.strictEqual(petsService.getPets() instanceof Promise, true);

        const getPets = await petsService.getPets();
        assert(getPets, pets);
    });

    it('should get single pet if the ID is right', async () => {
        assert.strictEqual(petsService.getSinglePet(213) instanceof Promise, true);
        const singlePetWrong = await petsService.getSinglePet();
        assert.deepEqual(singlePetWrong, undefined);

        const petId = pets.find((el) => el).id;
        const singlePetRight = await petsService.getSinglePet(petId);
        const singlePetIndex = pets.findIndex((el) => el.id === petId);

        assert.deepEqual(singlePetRight, pets[singlePetIndex])
    });

    it('should return undefined if the ID is wrong', async () => {
        const petId = 6776655656;
        const singlePet = await petsService.getSinglePet(petId);

        assert.strictEqual(singlePet, undefined);
    });

    it('should delete single pet if the ID is right', async () => {
        assert.strictEqual(petsService.deleteSinglePet(231) instanceof Promise, true);

        const pet = pets.find((el) => el);
        const delPet = await petsService.deleteSinglePet(pet.id);
        const petIndex = pets.findIndex((el) => el.id === pet.id);

        assert.deepStrictEqual(pet, delPet);
        assert.strictEqual(petIndex, -1);
    });

    it('should not delete any pet if the ID is wrong', async () => {
        const petId = 433444544;
        const newPets = deepCopy(pets);
        const delPet = await petsService.deleteSinglePet(petId);

        assert.strictEqual(delPet, undefined);
        assert.deepStrictEqual(newPets, pets)
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

    it('should update single pet if the ID is right', async () => {
        const petId = pets.find((el) => el).id;
        const body = {
            owner: 'Pejr',
            age: 2.7
        };
        const pet = pets.find((el) => el.id === petId);
        const updatedPet = await petsService.updateSinglePet(petId, body);
        assert.deepStrictEqual(pet, updatedPet);
    });

    it('should not update any pet if the ID is wrong', async () => {
        const petId = 2332324343;
        const body = {
            owner: 'Pejr',
            age: 2.7
        };
        const newPets = deepCopy(pets);
        const updatedPet = await petsService.updateSinglePet(petId, body);

        assert.deepStrictEqual(updatedPet, undefined);
        assert.deepStrictEqual(newPets, pets);
    });

});