require("mocha");
const request = require("supertest");
const app = require("../server");
const assert = require("assert");
const {
  FEATURES,
  EXAMINATION_EXIST_ERROR,
  REQUIRED_FEATURES_ERROR,
  PET_EXIST_ERROR,
  BAD_VALUE_TYPES,
  ALLOWED_FEATURES_ERROR
} = require("../src/helpers/constants");
const { deepCopy } = require("../src/helpers/helpers.functions");

const { examinations, pets } = require("../data");
const type = Object.keys(FEATURES).filter(el => el === "examination");
const auth = {
  authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYmFuZSIsImlhdCI6MTU0NDYwMzA2OH0.PU2CHlcNWX4BNDnA-gnIYflnYNXoKifrZtTJVqsWFuA"
};

describe("Unit test for examination controller", () => {
  describe("GET testing", () => {
    it("should get all examinations", async () => {
      const res = await request(app)
        .get("/examinations")
          .set(auth)
        .expect(examinations)
        .expect(200);
      assert.equal(res.body.length, examinations.length);
    });

    it("should get single examination if the ID is right", async () => {
      const existing = examinations.find(el => el.id);
      const res = await request(app)
        .get(`/examination/${existing.id}`)
          .set(auth)
          .expect(200);

      assert.deepStrictEqual(res.body, existing);
    });

    it("should return an empty object if the ID is wrong", async () => {
      const examId = 2121232321321;
      const res = await request(app)
        .get(`/examination/${examId}`)
          .set(auth)
        .expect(204);
      assert.deepStrictEqual(res.body, {});
    });

    it("should get all examinations by pet if the pet ID is right", async () => {
      const newExaminations = deepCopy(examinations);

      const existing = newExaminations.find(el => el.petId);
      const res = await request(app)
        .get(`/examinations/pet/${existing.petId}`)
          .set(auth)
          .expect(200);
      existing.pet = existing.pet = pets.find(el => el.id === existing.petId);
      delete existing.petId;

      assert.deepStrictEqual(res.body, [existing]);
    });

    it("should return an empty objects if the ID is wrong", async () => {
      const notExisting = 34342433243;
      const res = await request(app)
        .get(`/examination/${notExisting}`)
          .set(auth)
          .expect(204);

      assert.deepStrictEqual(res.body, {});
    });
  });

  describe("DELETE testing", () => {
    it("should delete an examination if the ID is right", async () => {
      const existed = examinations.find(el => el.id);
      const beforeLength = examinations.length;
      const res = await request(app)
        .delete(`/examination/${existed.id}`)
          .set(auth)
          .expect(200);
      const afterLength = examinations.length;

      assert.deepStrictEqual(existed, res.body);
      assert.notStrictEqual(beforeLength, afterLength);
    });

    it("should not delete anything if the ID is wrong", async () => {
      const notExisting = undefined;
      const res = await request(app)
        .delete(`/examination/${notExisting}`)
          .set(auth)
          .expect(400);
      assert.deepStrictEqual(res.body, EXAMINATION_EXIST_ERROR);
    });
  });

  describe("POST testing", () => {
    it("should add single examination", async () => {
      const oldExaminations = deepCopy(examinations);
      const examToAdd = {
        petId: "5adjw003",
        description: "Eat",
        scheduleTime: "2018-10-13 17:00:00"
      };
      const res = await request(app)
        .post("/examination")
          .set(auth)
        .send(examToAdd)
        .expect(201);

      oldExaminations.push(res.body);
      assert.deepStrictEqual(examinations, oldExaminations);
    });

    it("should throw error for missing required data send", async () => {
      const examToAdd = {
        petId: "5adjw003",
        scheduleTime: "2018-10-13 17:00:00"
      };
      const res = await request(app)
        .post("/examination")
          .set(auth)
        .send(examToAdd)
        .expect(400);

      assert.deepStrictEqual(res.body, REQUIRED_FEATURES_ERROR(type));
    });

    it("should throw error for wrong data type send", async () => {
      const examToAdd = {
        petId: "5adjw003",
        description: 123,
        scheduleTime: "2018-10-13 17:00:00"
      };
      const res = await request(app)
        .post("/examination")
          .set(auth)
        .send(examToAdd)
        .expect(400);

      assert.deepStrictEqual(res.body, BAD_VALUE_TYPES);
    });

    it("should throw error for empty data send", async () => {
      const examToAdd = {
        petId: "5adjw003",
        description: "",
        scheduleTime: ""
      };
      const res = await request(app)
        .post("/examination")
          .set(auth)
        .send(examToAdd)
        .expect(400);

      assert.deepStrictEqual(res.body, REQUIRED_FEATURES_ERROR(type));
    });

    it("should throw error for wrong ID send", async () => {
      const examToAdd = {
        petId: "123",
        description: "Eat",
        scheduleTime: "2018-10-13 17:00:00"
      };
      const res = await request(app)
        .post("/examination")
          .set(auth)
          .send(examToAdd)
        .expect(400);
      assert.deepStrictEqual(res.body, PET_EXIST_ERROR);
    });
  });

  describe("PUT testing", () => {
    it("should update single examination", async () => {
      const featureToAdd = { description: "Trojo" };
      const existed = examinations.find(el => el.id);
      const oldPet = deepCopy(existed);

      const res = await request(app)
        .put(`/examination/${existed.id}`)
          .set(auth)
          .send(featureToAdd)
        .expect(200);

      assert.notDeepStrictEqual(res.body, oldPet);
    });

    it("should throw error for wrong data send ", async () => {
      const featureToAdd = { wrong: "Trojo" };
      const { id } = examinations.find(el => el.id);

      const res = await request(app)
         .put(`/examination/${id}`)
          .set(auth)
          .send(featureToAdd)
         .expect(400);

      assert.deepStrictEqual(res.body, ALLOWED_FEATURES_ERROR(type));
    });

    it("should throw error for wrong data send ", async () => {
      const featureToAdd = { description: 123 };
      const { id } = examinations.find(el => el.id);

      const res = await request(app)
          .put(`/examination/${id}`)
          .set(auth)
          .send(featureToAdd)
          .expect(400);

      assert.deepStrictEqual(res.body, BAD_VALUE_TYPES);
    });
  });
});
