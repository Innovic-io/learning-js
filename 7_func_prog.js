const array = [3, 5, 12, 87, 33];

let sum = array.map((element) => {
    element += 1;
}).reduce((sum, value) => {
    return sum + value;
}, 0);

console.log(sum);
let sum = 0
for( let i = 0; i<array.length; i++){
    sum += array[i];
}