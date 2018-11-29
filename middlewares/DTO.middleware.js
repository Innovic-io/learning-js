const { FEATURES, ALLOWED_FEATURES_ERROR, REQUIRED_FEATURES_ERROR } = require("../helpers/constants");

module.exports = (req, res, next) => {
    const {body: sentPet} = req;
    const [ ,type ]= req.originalUrl.split('/');
    if (Object.keys(sentPet).some((key) => !FEATURES[type].includes(key))) {
        return res.status(400).json(ALLOWED_FEATURES_ERROR(type));
    }
    if (req.method === 'POST' && FEATURES[type].some((key) => !sentPet[key])) {
        return res.status(400)
            .json(REQUIRED_FEATURES_ERROR(type));
    }
    return next();
};