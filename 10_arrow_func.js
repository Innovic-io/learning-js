const names = [
    'Helena',
    'Uros',
    'Predrag',
    'Milica'
    ];

let nvalue1 = names.map((array) => {return array});

// @TODO why you use brackets (names) ?
let nvalue2 = () => (names);
let nvalue3 = () => ({Imena: names});

let nvalue4 = ((...args) => args)(1, 2, 3);

let nvalues2 = function(array) {
    return array;
};

console.log(nvalue1);
console.log(nvalue2());
console.log(nvalue3());
console.log(nvalue4);
console.log(nvalues2(names));
