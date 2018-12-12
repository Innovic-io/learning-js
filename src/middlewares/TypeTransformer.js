const { EXPECTED_TYPES } = require("../helpers/constants");

module.exports = (req, res, next) => {
  const { body: pet } = req;

  const [, type] = req.originalUrl.split("/");

  if (
    Object.keys(pet).some(
      key => !EXPECTED_TYPES[type][key].expected.includes(typeof pet[key])
    )
  ) {
    return res.status(400).json({ error: "Bad values sent" });
  }
  Object.keys(pet).forEach(key => {
    pet[key] = EXPECTED_TYPES[type][key].method(pet[key]);
  });

  return next();
};
