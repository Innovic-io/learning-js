// @TODO refactor so function/arrow is used properly

//Function used as argument

function nameRetF(s) {
    return s;
}

function fullnameF(name, surname) {
    console.log(name + " " + surname);
}

fullnameF(nameRetF("Branislav"), "Simsic");

//Arrow used as argument

const nameRetA = (n) => n;

const fullnameA = () => console.log(nameRetA('Jovan'), 'Zvizdic');

fullnameA();

//Function returns function

function n() {
    console.log('Obrad');
}

function retFunction() {
    return n();
}
retFunction();

//Arrow returns arrow

const fAsValue = () => console.log('Petar');

const fAs = () => fAsValue();
fAs();

//Function used as value

function fValue(number) {
    return number*3;
}

const numValueF = fValue(3);
console.log(numValueF);


//Arrow used object

let peopleA = {
    names: ['Stefan', 'Njegos', 'Risto', 'Vuk'],
    funcNames:() =>  {
        console.log(this.names)
        }
};

peopleA.funcNames();
