const { users } = require("../../data.json");

module.exports = class LoginService {
  constructor(sentUsers) {
    this.users = sentUsers || users;
  }

  async getUser(body) {
    const user = this.users.find(
      us => us.name === body.name && us.password === body.password
    );
    return user;
  }
};
