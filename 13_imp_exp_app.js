// TODO export UserClass as default value, so you don't need UserClass.UserClass
const UserClass = require('./13_imp_exp_user.class');

let user = UserClass.UserClass(`Ivan`, `Jelacic`);
//user.Hi();
console.log(user.name);

