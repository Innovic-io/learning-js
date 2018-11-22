const assert = require('assert');

const { deepCopy } = require('./helpers.functions');

const test = () => {
    const array = [1, 2 ,3 ,5, 4, 3];
    const arrayCopy = deepCopy(array);
    assert.deepEqual(array, arrayCopy);
    array.push(9);
    arrayCopy.push(8);
    assert.notDeepEqual(arrayCopy, array);
    assert.notDeepStrictEqual(arrayCopy, array);

    const obj = {
        name: 'Grrr',
        surname: 'Psoado'
    };
    const newObj = deepCopy(obj);
    assert.deepStrictEqual(obj, newObj);
    newObj.nickname = 'Adkasdk';
    obj.height = 180;
    assert.notDeepEqual(newObj, obj);
    assert.notDeepStrictEqual(newObj, obj);

    let string = 'Jalalala';
    let newStr = deepCopy(string);
    assert.strictEqual(string, newStr);
    assert.equal(string, newStr);
    string += 'sad';
    newStr += 'oewiq';
    assert.notEqual(string, newStr)
    assert.notStrictEqual(string, newStr)

    let number = 199;
    let newNum = deepCopy(number);
    assert.equal(number, newNum);
    assert.strictEqual(number, newNum);
    number += 1282.324;
    newNum += 12;
    assert.notEqual(number, newNum);
    assert.notStrictEqual(number, newNum);


}

test();