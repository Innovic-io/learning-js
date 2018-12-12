const {
  addIdPushAndReturn,
  getLength,
  getKeys,
  deepCopy
} = require("../helpers/helpers.functions");

const { pets } = require("../../data.json");

class PetsService {
  constructor(sentPets) {
    this.pets = sentPets || pets;
  }

  async getPets(query = {}) {
    let pets = deepCopy(this.pets);

    if (query.fields) {
      pets = pets.map(el => getKeys(el, query.fields));
    }
    if (query.sort) {
      if (query.sort[0] === "-") {
        const sortBy = query.sort.slice(1);
        pets.sort((a, b) =>
          b[sortBy].toString().localeCompare(a[sortBy].toString())
        );
      } else {
        pets.sort((a, b) =>
          a[query.sort].toString().localeCompare(b[query.sort].toString())
        );
      }
    }

    return pets.slice(...getLength(query));
  }

  async getSinglePet(petId, query = {}) {
    let singlePet = this.pets.find(el => el.id === petId);

    if (query.fields) {
      singlePet = getKeys(singlePet, query.fields);
    }
    return singlePet;
  }

  async deleteSinglePet(petId, query = {}) {
    const index = this.pets.findIndex(el => el.id === petId);

    if (index > -1) {
      let [deletedPet] = this.pets.splice(index, 1);

      if (query.fields) {
        deletedPet = getKeys(deletedPet, query.fields);
      }
      return deletedPet;
    }
  }

  async addSinglePet(newPet) {
    return addIdPushAndReturn(newPet, this.pets);
  }

  async updateSinglePet(petId, body) {
    const pet = this.pets.find(el => el.id === petId);
    return pet && Object.assign(pet, body);
  }
}

module.exports = PetsService;
