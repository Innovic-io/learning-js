const assert = require('assert');

const names = [
    'Helena',
    'Uros',
    'Predrag',
    'Milica'
    ];

const nvalue1 = names.map((array) => {return array});

const nvalue2 = () => names;

const nvalue3 = () => ({Imena: names});
const nvalue5 = () => { return {Imena: names} };
function nvalue6() {
    return {Imena: names};
}

const nvalue4 = ((...args) => args)(1, 2, 3, names, 'sadasd', 123);

const nvalues2 = function(array) {
    return array;
};

console.log(nvalue1);
console.log(nvalue2());
console.log(nvalue3());
console.log(nvalue4);
console.log(nvalues2(names));

assert.deepEqual(nvalue3(), nvalue5());
assert.deepEqual(nvalue6(), nvalue3());