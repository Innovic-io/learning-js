// @TODO write this as tests, so it can be clear what is going on
let v1 = Symbol(200);
let v2 = Symbol(200);

if(v1 == v2)
    console.log(`${v1.toString()} and ${v2.toString()} are equal`);
else
    console.log(`${v1.toString()} and ${v2.toString()} are not equal`);

if(v1 === v2)
    console.log(`${v1.toString()} and ${v2.toString()} are equal`);
else
    console.log(`${v1.toString()} and ${v2.toString()} are not equal`);
