// @TODO refactor so function/arrow is used properly
console.log("Function as argument: ");

    function Name1(s)
    {
        return s;
    }

    function fullname(name, surname)
    {
        console.log(name + " " + surname);
    }

    fullname(Name1("Branislav"), "Simsic");


console.log("Function returns another function: ");

function n()
{
    console.log("Obrad");
};

function Name2()
{
    return n();
}

Name2();


console.log("Function as a value of variable: ");

function Name3(s)
{
    return s;
}

let name3 = Name3("Ivan");

console.log(name3);

