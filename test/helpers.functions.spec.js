require("mocha");
const assert = require("assert");

const {
  deepCopy,
  addIdPushAndReturn
} = require("../helpers/helpers.functions");

describe("Unit test for helpers", () => {
  beforeEach(() => {
    this.obj = {
      name: "sadjk",
      surname: "sdadssdads"
    };
    this.objects = [
      { name: "iewier", surname: "ewoqowoewqoewo" },
      { name: "qwieiew", osos: "weekd" }
    ];
  });

  it("should make a deep copy of an array ", () => {
    const array = [1, 2, 3, 5, 4, 3];
    const arrayCopy = deepCopy(array);
    assert.deepEqual(array, arrayCopy);
    array.push(9);
    assert.notDeepStrictEqual(arrayCopy, array);
    arrayCopy.push(9);
    assert.deepStrictEqual(arrayCopy, array);
    arrayCopy.push(9);
    assert.notDeepStrictEqual(arrayCopy, array);
  });

  it("should make a deep copy of an object", () => {
    const obj = {
      name: "Grrr",
      surname: "Psoado"
    };
    const newObj = deepCopy(obj);
    assert.deepStrictEqual(obj, newObj);
    newObj.nickname = "Adkasdk";
    assert.notDeepStrictEqual(newObj, obj);
    delete newObj.nickname;
    assert.deepStrictEqual(obj, newObj);
    obj.nickname = "Adkasdk";
    assert.notDeepStrictEqual(newObj, obj);
  });

  it("should make a deep copy of a string", () => {
    let string = "Jalalala";
    let newStr = deepCopy(string);
    assert.strictEqual(string, newStr);
    string += "sad";
    assert.notStrictEqual(string, newStr);
    newStr = deepCopy(string);
    newStr += "else";
    assert.notStrictEqual(string, newStr);
  });

  it("should make a deep copy of a number", () => {
    let number = 199;
    let newNum = deepCopy(number);
    assert.strictEqual(number, newNum);
    number += 1282.324;
    assert.notStrictEqual(number, newNum);
    newNum = deepCopy(number);
    newNum += 4;
    assert.notStrictEqual(number, newNum);
  });

  it("should add new object to an array of objects", () => {
    const newObjects = addIdPushAndReturn(this.obj, this.objects);

    assert.notDeepStrictEqual(this.objects, newObjects);
  });

  it("should add an ID to the object", () => {
    const newObject = addIdPushAndReturn(this.obj, this.objects);
    assert.strictEqual(typeof newObject.id, "string");
  });
});
