const array = [2, 3, 4, 53, 23, 11, 5, 2, 44, 3];
let car = [
    {model: "Toyota", type: "Corolla", color: "white"},
    {model: "Hyundai", type: "Tucson", color: "red"},
    {model: "VW", type: "Polo", color: "blue"},
    {model: "Lada", type: "Niva 2018", color: "yellow"},
    {model: "Opel", type: "Insignia", color: "black"}
];

let string = "";
for(let el in array) {
    string += array[el]+ " ";
}

console.log(string);

for(let el of car){
    console.log(el);
}


for(let i=0; i<array.length; i++){
    console.log(array[i]);
}

let i= 0;
let st = "";

while( i<array.length){
    st += array[i] + " ";
    i++;
}
console.log(st);

array.map((array) => {
    return array;
});

console.log(array);

array.forEach(function(elem){
    console.log(elem);
});