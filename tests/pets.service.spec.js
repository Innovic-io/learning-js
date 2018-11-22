const assert = require('assert');
const PetsService = require('../services/pets.service');
const {pets} = require('../data');

const petsService = new PetsService();

const test = async () => {
    assert.strictEqual(petsService.getPets() instanceof Promise, true);
    assert.strictEqual(petsService.addSinglePet({}) instanceof Promise, true);
    assert.strictEqual(petsService.deleteSinglePet(231) instanceof Promise, true);
    assert.strictEqual(petsService.getSinglePet(213) instanceof Promise, true);

    const getPets = await petsService.getPets();
    assert(getPets, pets);

    const singlePetWrong = await petsService.getSinglePet();

    assert.deepEqual(singlePetWrong, undefined);

    const petId = '5adjw001'
    const singlePetRight = await petsService.getSinglePet(petId)
    const singlePetIndex = pets.findIndex((el) => el.id = petId)

    assert.deepEqual(singlePetRight, pets[singlePetIndex])

    const pet = pets.find((el) => el.id === petId)
    const delPet = await petsService.deleteSinglePet(petId);
    const petIndex = pets.findIndex((el) => el.id === petId)

    assert.deepStrictEqual(pet, delPet);
    assert.strictEqual(petIndex, -1)

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
    assert.deepEqual(pets[pets.length - 1], newPet);
    assert.notDeepEqual(newPet, pets);
    assert.notDeepStrictEqual(newPet, pets);

}

test();