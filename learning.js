// @TODO use let/const properly
// @TODO try to use backtic where possible and useful.
// @TODO refactor so function/arrow is used properly
// @TODO use === insted of ==
// @TODO refactor for loops here

const util = require('util');

let name, surname;
name = 'Branislav';
surname = 'Simsic';

const number1 = 13;
const number2 = 4;

const multiplied = number1 * number2;
console.log(`${number1} * ${number2} = ${multiplied}`);

const fullname = `${name} ${surname}`;
console.log(fullname);

function multiply(broj1, broj2) {
    return broj1 * broj2;
}

const b = multiply(12, 4);
console.log(b);

function concatenate(string1, string2) {
    return `${string1} ${string2}`;
}
//  @TODO make concatenate with infinite number of elements

const conc = (...args) => (console.log(args.join(' ')));
const s = concatenate("Jedan", "jedini");
console.log(s);
conc(123, 132, 123, 'ads', 'asd', '1123412313');


function relation(broj1, broj2) {
    if(broj1 < broj2){
        console.log(`${broj1} je manji od ${broj2}`);
    }
    else if(broj1 > broj2){
        console.log(`${broj1} je veci od ${broj2}`);
    }
    else if(broj1 === broj2){
        console.log(`${broj1} je jednak broju ${broj2}`);
    }
}

relation(1412, 15);
relation(1, 19);
relation(2, 2);

function stringRelation(s1, s2) {
    if(s1.length > s2.length){
        console.log(`'${s1}' ima vise karaktera od '${s2}'`);
    }
    else if(s1.length < s2.length) {
        console.log(`'${s1}' ima manje karaktera od '${s2}'`);
    }
    else if(s1.length === s2.length) {
        console.log(`'${s1}' ima jednak broj karaktera kao '${s2}'`)
    }
}

stringRelation("fantasticno", "bezveze");
stringRelation("itekako", "svakako");
stringRelation("da", "naravno");

let numberArray = [2, 13, 23, 3, 9];

function print(array) {
    console.log(array);
}


function sort(array) {
    for(let i=0; i<array.length; i++)
        for(let j=0; j<array.length; j++)
            if(array[i] > array[j]) {
                let t = array[i];
                array[i] = array[j];
                array[j] = t;
            }
            return array;
}

print(numberArray);
sort(numberArray);
print(numberArray);

let stringArray = ["Igor", "Jana", "Stevan", "Simeun"];

function search(stringArray) {
    let j =0;
    stringArray.forEach(function(name){
        if(name === "Jana"){
            j++;
        }
    });
        console.log(`U datom nizu imena, 'Jana' se pojavljuje ${j} put/a`);
}

print(stringArray);
search(stringArray);

let carArray = [
    {
        type: "Fiat",
        model: "500",
        color: "white",
        details: { year: 2005, kmCovered: 200000}
    },
    {
        type: "BMW",
        model: "i8",
        color: "black",
        details: { year: 2014, kmCovered: 10000}
    },
    {
        type: "Opel",
        model: "Astra",
        color: "white",
        details: { year: 2003, kmCovered: 300000}
    }
];


carArray.forEach(function(object){
    if(object.color === "white"){
        console.log(`${object.type}, ${object.model}, ${object.color}`);
        console.log(util.inspect({carArray}, false, null));
    }
});

function getValue(field) {
    const object = {
        name: 1,
        age: 2,
        nesto: 3
    };
    return object[field]
}

console.log(getValue('age'));
