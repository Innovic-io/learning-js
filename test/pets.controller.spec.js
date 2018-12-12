require("mocha");
const request = require("supertest");
const app = require("../../server");
const assert = require("assert");
const {
  FEATURES,
  ALLOWED_FEATURES_ERROR,
  PET_EXIST_ERROR,
  BAD_VALUE_TYPES,
  REQUIRED_FEATURES_ERROR
} = require("../helpers/constants");

const { pets } = require("../../data");
const { deepCopy } = require("../helpers/helpers.functions");
const type = Object.keys(FEATURES).filter(el => el === "pet");

describe("Unit test for pets controller", () => {
  describe("GET testing", () => {
    it("should get all pets", async () => {
      const res = await request(app)
        .get("/pets")
        .expect(pets)
        .expect(200);
      assert.strictEqual(res.body.length, pets.length);
    });

    it("should get single pet if the ID is right", async () => {
      const petId = pets.find(el => el).id;
      const res = await request(app)
        .get(`/pet/${petId}`)
        .expect(200);
      assert.deepStrictEqual(res.body, pets.find(el => el.id === petId));
    });

    it("should get an empty object if the ID is wrong", async () => {
      const petId = undefined;
      const res = await request(app)
        .get(`/pet/${petId}`)
        .expect(204);

      assert.deepStrictEqual(res.body, {});
    });
  });

  describe("DELETE testing", () => {
    it("should delete pet if the ID is right", async () => {
      const petId = pets.find(el => el).id;
      const petToDelete = pets.find(el => el.id === petId);
      const beforeLength = pets.length;
      const res = await request(app)
        .delete(`/pet/${petId}`)
        .expect(200);
      const afterLength = pets.length;

      assert.deepStrictEqual(res.body, petToDelete);
      assert.notDeepStrictEqual(beforeLength, afterLength);
    });

    it("should not delete anything if the ID is wrong", async () => {
      const petId = 8384383823;
      const res = await request(app)
        .delete(`/pet/${petId}`)
        .expect(400);

      assert.deepStrictEqual(res.body, PET_EXIST_ERROR);
    });
  });

  describe("POST testing", () => {
    it("should add new pet if the ID is right", async () => {
      const oldPets = deepCopy(pets);
      const petToAdd = {
        name: "Ppaaa",
        tags: 3,
        status: "alive",
        breed: "Dalmatian",
        age: 2
      };
      const res = await request(app)
        .post("/pet")
        .send(petToAdd)
        .expect(201);
      oldPets.push(res.body);
      assert.deepStrictEqual(pets, oldPets);
    });

    it("should throw an error for trying to add new pet with wrong data send", async () => {
      const petToAdd = {
        adads: "Ppaaa",
        ads: 3,
        fdfgd: "alive",
        trz: "Dalmatian",
        age: 2
      };
      const res = await request(app)
        .post("/pet")
        .send(petToAdd)
        .expect(400);

      assert.deepStrictEqual(res.body, ALLOWED_FEATURES_ERROR(type));
    });

    it("should throw an error for trying to add new pet with empty data send", async () => {
      const petToAdd = {
        name: "",
        tags: 3,
        status: "",
        breed: "",
        age: 2
      };
      const res = await request(app)
        .post("/pet")
        .send(petToAdd)
        .expect(400);

      assert.deepStrictEqual(res.body, REQUIRED_FEATURES_ERROR(type));
    });

    it("should throw an error for trying to add new pet with wrong data type send", async () => {
      const petToAdd = {
        name: 3,
        tags: "das",
        status: 234,
        breed: "sa",
        age: 2
      };
      const res = await request(app)
        .post("/pet")
        .send(petToAdd)
        .expect(400);

      assert.deepStrictEqual(res.body, BAD_VALUE_TYPES);
    });
  });

  describe("PUT testing", () => {
    it("should update single pet", async () => {
      const body = {
        name: "Ppaaa",
        tags: 3
      };
      const petToUpdate = pets.find(el => el);
      const oldPet = deepCopy(petToUpdate);
      const petId = petToUpdate.id;

      const res = await request(app)
        .put(`/pet/${petId}`)
        .send(body)
        .expect(201);

      assert.notDeepStrictEqual(res.body, oldPet);
    });

    it("should throw an error for trying to update pet with wrong data send ", async () => {
      const body = {
        poiads: "Ppaaa",
        tags: 3
      };
      const { id } = pets.find(el => el);

      const res = await request(app)
        .put(`/pet/${id}`)
        .send(body)
        .expect(400);

      assert.deepStrictEqual(res.body, ALLOWED_FEATURES_ERROR(type));
    });

    it("should throw an error for trying to update pet with wrong data type send ", async () => {
      const body = {
        name: 213,
        tags: "adssdd"
      };
      const { id } = pets.find(el => el);

      const res = await request(app)
        .put(`/pet/${id}`)
        .send(body)
        .expect(400);

      assert.deepStrictEqual(res.body, BAD_VALUE_TYPES);
    });
  });
});
