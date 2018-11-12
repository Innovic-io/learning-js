const array1 = [1, 2, 3, 4];
console.log(array1);
const array2 = [...array1, 5, 6, 7];
console.log(array2);

const obj1 = { model: "Audi", color: "black" };
console.log(obj1);
const obj2 = { ...obj1, maxSpeed: 200, numberOfDoors: 5};
console.log(obj2);

/*  How to do this?
const color, model = obj2
const one, two, rest = array2
*/

const {color, model} = obj1;
console.log(color);
console.log(model);

const [one, two, ...rest] = array2;
console.log(one, two, rest);

