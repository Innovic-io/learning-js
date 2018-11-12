const assert = require('assert');

const actual = {
    name: 'Branislav',
    age: 24,
    surname: 'Who cares'
};

const expected = {
    name: 'Branislav',
    age: 24,
    surname: 'Who cares'
};

const expected2 = {
    name: 'Branislav',
    age: "24",
    surname: 'Who cares'
};

const expected3 = {
    name: 'Branislav',
    age: 24,
    surname: 'Who cares',
    weight: 87

};

const arrayActual = [actual, 3];
const arrayExpected = [expected, 3];
const arrayExpected2 = [expected, '3'];

// equal()

assert.equal('1', 1);
assert.equal(null, undefined);
assert.equal(0, '');
assert.equal('', false);
assert.equal(false, 0);
assert.equal(true, 1);
assert.equal(JSON.stringify(actual), JSON.stringify(expected))



// notEqual()

assert.notEqual(actual, expected);
assert.notEqual(actual, expected2);
assert.notEqual(arrayActual, arrayExpected);
assert.notEqual(arrayActual, arrayExpected2);
assert.notEqual(1, 2);
assert.notEqual(null, 0);
assert.notEqual(undefined, 0);
assert.notEqual(undefined, '');
assert.notEqual(null, '');
assert.notEqual(true, 9);


// strictEqual()

assert.strictEqual(`1`, `1`);


// notStrictEqual()

assert.notStrictEqual(actual, expected);
assert.notStrictEqual(actual, expected2);
assert.notStrictEqual(arrayActual, arrayExpected);
assert.notStrictEqual(arrayActual, arrayExpected2);
assert.notStrictEqual(`1`, 1);
assert.notStrictEqual(null, undefined);
assert.notStrictEqual(0, '');
assert.notStrictEqual('', false);
assert.notStrictEqual(false, 0);
assert.notStrictEqual(true, 1);


// deepEqual()

assert.deepEqual(actual, expected);
assert.deepEqual(actual, expected2);
assert.deepEqual(arrayActual, arrayExpected);
assert.deepEqual(arrayActual, arrayExpected2);
assert.deepEqual(`1`, 1);
assert.deepEqual(null, undefined);
assert.deepEqual(0, '');
assert.deepEqual('', false);
assert.deepEqual(false, 0);
assert.deepEqual(true, 1);


// deepStrictEqual()

assert.deepStrictEqual(actual, expected);
assert.deepStrictEqual(arrayActual, arrayExpected);
assert.deepStrictEqual(`1`, `1`);


// notDeepEqual()

assert.notDeepEqual(actual, expected3);
assert.notDeepEqual(`1`, 2);
assert.notDeepEqual(null, 0);
assert.notDeepEqual(undefined, 0);
assert.notDeepEqual(undefined, '');
assert.notDeepEqual(null, '');
assert.notDeepEqual(true, 9);


// notDeepStrictEqual()
assert.notDeepStrictEqual(actual, expected2);
assert.notDeepStrictEqual(arrayActual, arrayExpected2);
assert.notDeepStrictEqual(actual, expected3);
assert.notDeepStrictEqual(null, undefined);
assert.notDeepStrictEqual(0, '');
assert.notDeepStrictEqual('', false);
assert.notDeepStrictEqual(false, 0);
assert.notDeepStrictEqual(true, 1);