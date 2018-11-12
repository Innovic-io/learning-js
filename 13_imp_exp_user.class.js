// @TODO try to make Hi function of "UserClass"
function UserClass (name, surname) {
        this.name = name;
        this.surname = surname;
    Hi(name, surname, 123, 4, 34, 453, 5324, 654,6, 356, 35,6, 346, 356)
    return this;

}
function Hi(...args) {
    console.log(args.join());
}
module.exports.UserClass = UserClass