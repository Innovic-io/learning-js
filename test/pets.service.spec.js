require('mocha');
const assert = require('assert');

const PetsService = require('../services/pets.service');
const { pets } = require('../data');
const { deepCopy, getKeys } = require('../helpers/helpers.functions');

describe('Unit test for pets service', () => {
    let petsService;
    let petsCopy;

    beforeEach(() => {
        petsCopy  = deepCopy(pets);
        petsService = new PetsService(petsCopy);
    });

    describe('GET testing', () => {

        it('should get all pets', async () => {
            assert.strictEqual(petsService.getPets() instanceof Promise, true);

            const getPets = await petsService.getPets();
            assert(getPets, petsCopy);
        });

        it('should get only desired fields of all pets', async () => {
            const query = { fields: 'name'};
            const actualPets = await petsService.getPets(query);
            const expectedPets = petsCopy.map((el) => getKeys(el, query.fields));

            assert.deepStrictEqual(actualPets, expectedPets);
        });

        it('should get all sorted pets in ascending order', async () => {
            const query = { sort: 'name'};
            const actualSortedPets = await petsService.getPets(query);
            const expectedSortedPets = petsCopy.sort((a, b) => a[query.sort].toString().localeCompare(b[query.sort].toString()));

            assert.deepStrictEqual(actualSortedPets, expectedSortedPets);
        });

        it('should get all sorted pets in descending order', async () => {
            const query = { sort: '-name'};
            const actualSortedPets = await petsService.getPets(query);
            const expectedSortedPets = petsCopy.sort((a, b) => b[query.sort.slice(1)].toString().localeCompare(a[query.sort.slice(1)].toString()));

            assert.deepStrictEqual(actualSortedPets, expectedSortedPets);
        });

        it('should get a limited number of pets with offset ', async () => {
            const query = { offset: 4 };
            const actualOffsetPets = await petsService.getPets(query);
            const expectedOffsetPets = petsCopy.slice(0, query.offset + 1);

            assert.deepStrictEqual(actualOffsetPets, expectedOffsetPets);
        });

        it('should skip some pets from the beginning', async () => {
            const query = { skip: 1 };
            const actualSkippedPets = await petsService.getPets(query);
            const expectedSkippedPets = petsCopy.slice(query.skip, petsCopy.length);

            assert.deepStrictEqual(actualSkippedPets, expectedSkippedPets);
        });

        it('should get single pet if the ID is right', async () => {
            assert.strictEqual(petsService.getSinglePet(213) instanceof Promise, true);
            const singlePetWrong = await petsService.getSinglePet();
            assert.deepEqual(singlePetWrong, undefined);

            const petId = petsCopy.find((el) => el).id;
            const singlePetRight = await petsService.getSinglePet(petId);
            const singlePetIndex = petsCopy.findIndex((el) => el.id === petId);

            assert.deepEqual(singlePetRight, petsCopy[singlePetIndex])
        });

        it('should return undefined if the ID is wrong', async () => {
            const petId = 6776655656;
            const singlePet = await petsService.getSinglePet(petId);

            assert.strictEqual(singlePet, undefined);
        });

    });

    describe('DELETE testing', () => {

        it('should delete single pet if the ID is right', async () => {
            assert.strictEqual(petsService.deleteSinglePet(231) instanceof Promise, true);

            const pet = petsCopy.find((el) => el);
            const petId = pet.id;

            const delPet = await petsService.deleteSinglePet(petId);
            const petIndex = petsCopy.findIndex((el) => el.id === petId);

            assert.deepStrictEqual(pet, delPet);
            assert.strictEqual(petIndex, -1);
        });

        it('should delete single pet and return only desired fields', async () => {
            const pet = petsCopy.find((el) => el);
            const query = { fields: 'name'};

            const actualDeletedPet = await petsService.deleteSinglePet(pet.id, query);
            const expectedDeletedPet = {name: pet.name, id: pet.id};

            assert.deepStrictEqual(actualDeletedPet, expectedDeletedPet);
        });

        it('should not delete any pet if the ID is wrong', async () => {
            const petId = 433444544;
            const delPet = await petsService.deleteSinglePet(petId);

            assert.strictEqual(delPet, undefined);
            assert.deepStrictEqual(petsCopy, pets)
        });

    });

    describe('CREATE testing', () => {

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
            assert.deepEqual(petsCopy[petsCopy.length-1], newPet);
        });

    });

    describe('UPDATE testing', () => {

        it('should update single pet if the ID is right', async () => {
            const petId = petsCopy.find((el) => el).id;
            const body = {
                owner: 'Pejr',
                age: 2.7
            };
            const pet = petsCopy.find((el) => el.id === petId);
            const updatedPet = await petsService.updateSinglePet(petId, body);
            assert.deepStrictEqual(pet, updatedPet);
        });

        it('should not update any pet if the ID is wrong', async () => {
            const petId = 2332324343;
            const body = {
                owner: 'Pejr',
                age: 2.7
            };
            const updatedPet = await petsService.updateSinglePet(petId, body);

            assert.deepStrictEqual(updatedPet, undefined);
        });

    });
});