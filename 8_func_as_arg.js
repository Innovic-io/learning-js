function Hello(x)
{
    return x;
}

function Goodbye()
{
    console.log("Goodbye!")
}

Hello(Goodbye());


this.a = 'a';

function Person (name) {
    this.name = name;

    console.log(this.a);
    return (callback, a, b) => {

        return callback(a, b);
    }
}

function dummyCallback(a, b) {
    return a + b
}

const myCopy = dummyCallback;
const a = (a, b) => {
    console.log(this.a);
    return a + b;
}
console.log(a(2,2))
const p = new Person('a')(myCopy, 2, 3);

console.log(p)