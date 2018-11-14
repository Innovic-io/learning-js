const array = [3, 5, 12, 87, 33];

let arraySum = array.reduce((sum, value) => {
    return sum + value;
}, 0);

console.log(arraySum);

