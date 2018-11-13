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


//Function

const peopleA = {
    names: ['Stefan', 'Njegos', 'Risto', 'Vuk'],
    funcNames:function() {
        console.log(this.names)
        }
};

peopleA.funcNames();

//Arrow and function

function name() {
    this.array = [1, 2, 3];
    const self = this;

    function subFunction() {
        console.log(this.array); // supposed to be undefined
        console.log(self.array); // 1, 2, 3
    }
    subFunction();

    func = () => {
        console.log(self.array); // 1, 2, 3
        console.log(this.array); // 1, 2, 3
    };
    func()
}

name();

//Function

const cat1 = {
    lives: 9,
    jumps: function (){
        this.lives--;
    }
}
cat1.jumps();
console.log(cat1.lives);

//Arrow

const cat2 = {
    lives: 9,
    jumps: () => {
        this.lives--;
    }
}
cat2.jumps();
console.log(cat2.lives);