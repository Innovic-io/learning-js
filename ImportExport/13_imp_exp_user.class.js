// @TODO try to make Hi function of "UserClass"
class UserClass {
    constructor (name, surname) {
        this.name = name;
        this.surname = surname;
    };

    Hi() {
        console.log(this.name, this.surname);
    }
}

/*
function Hi(...args) {
    console.log(args.join());
}
*/
module.exports = UserClass;