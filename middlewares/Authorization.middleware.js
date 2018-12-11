const LoginService = require('../services/login.service');
const jwt = require('jsonwebtoken');
const loginService = new LoginService();

module.exports = async (req, res, next) => {
    try {
        const decoded = await jwt.verify(req.header.authorization, config.secret);

    }

};