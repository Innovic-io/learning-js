// @TODO write this as tests, so it can be clear what is going on
const assert = require('assert');

const v1 = Symbol(200);
const v2 = Symbol(200);

assert.notEqual(v1, v2);
assert.notDeepEqual(v1, v2);
assert.notStrictEqual(v1, v2);
assert.notDeepStrictEqual(v1, v2);

const obj1 = {
    "name": "Igor",
    "surname": "Protic",
    "height": 180,
    "weight": 90
};

const obj2 = {
    "name": "Igor",
    "surname": "Protic",
    "height": 180,
    "weight": 90
};

const o1 = Symbol(obj1);
const o2 = Symbol(obj2);

assert.notEqual(o1, o2);
assert.notDeepEqual(o1, o2);
assert.notStrictEqual(o1, o2);
assert.notDeepStrictEqual(o1, o2);