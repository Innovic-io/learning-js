const assert = require('assert');
const PetsService = require('../services/pets.service');

const petsService = new PetsService();

assert(petsService.getPets(), []);
assert(petsService.addSinglePet({}), {});
assert(petsService.deleteSinglePet(231), {});
assert(petsService.getSinglePet(213), {});

assert(petsService.getPets(), {});
assert(petsService.addSinglePet({}), {});
assert(petsService.deleteSinglePet({}), {});
assert(petsService.getSinglePet({}), {});




