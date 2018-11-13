// TODO export UserClass as default value, so you don't need UserClass.UserClass
const UserClass = require('./13_imp_exp_user.class');

const user = new UserClass('Ivan', 'Jelacic');
user.Hi();

console.log(user.name);
console.log(user.surname);

