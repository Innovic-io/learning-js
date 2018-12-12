const jwt = require("jsonwebtoken");

const { CONFIG } = require("../helpers/constants");
const LoginService = require("../services/login.service");

let loginService;

module.exports = class LoginController {
  constructor() {
    loginService = new LoginService();
  }

  async getToken(req, res, next) {
    const user = await loginService.getUser(req.body);
    if (user) {
      const token = jwt.sign(
        { name: user.name },
        CONFIG.secret
      );
      res.status(200).json({ auth: true, token });
    }

    next();
  }

  async decodeToken(req, res, next) {
    try {
      req.user = await jwt.verify(req.headers.authorization, CONFIG.secret);
      next();
    } catch (e) {
      res.status(403).json({ message: e.message });
    }
  }
};
