const assert = require('assert');

const { deepCopy } = require('../helpers/helpers.functions');

const array = [1, 2 ,3 ,5, 4, 3];
const arrayCopy = deepCopy(array);
assert.deepEqual(array, arrayCopy);
array.push(9);
assert.notDeepStrictEqual(arrayCopy, array);
arrayCopy.push(9);
assert.deepStrictEqual(arrayCopy, array);
arrayCopy.push(9);
assert.notDeepStrictEqual(arrayCopy, array);

const obj = {
    name: 'Grrr',
    surname: 'Psoado'
};
const newObj = deepCopy(obj);
assert.deepStrictEqual(obj, newObj);
newObj.nickname = 'Adkasdk';
assert.notDeepStrictEqual(newObj, obj);
delete newObj.nickname;
assert.deepStrictEqual(obj, newObj);
obj.nickname = 'Adkasdk';
assert.notDeepStrictEqual(newObj, obj);


let string = 'Jalalala';
let newStr = deepCopy(string);
assert.strictEqual(string, newStr);
string += 'sad';
assert.notStrictEqual(string, newStr);
newStr = deepCopy(string);
newStr += 'else';
assert.notStrictEqual(string, newStr);


let number = 199;
let newNum = deepCopy(number);
assert.strictEqual(number, newNum);
number += 1282.324;
assert.notStrictEqual(number, newNum);
newNum = deepCopy(number);
newNum += 4;
assert.notStrictEqual(number, newNum);
