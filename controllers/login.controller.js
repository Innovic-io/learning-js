const jwt = require('jsonwebtoken');
const LoginService = require('../services/login.service');

let loginService;

module.exports = class LoginController {
    constructor() {
        loginService = new LoginService();
    }

    async getToken (req, res, next) {

        const user = await loginService.getUser(req.body);
        const config = {secret: 'supersecret'};
        if(user) {
            let token = jwt.sign({ name: user.name }, config.secret );
            res.status(200).json({auth: true, token: token});
        }

        next();
    }
};
