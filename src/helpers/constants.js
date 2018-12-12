const features = {
    pet: ['name', 'age', 'breed', 'status', 'tags'],
    examination: [ 'petId', 'description', 'scheduleTime']
};

const expectedConstant = {
    string: {
        expected: ['string'],
        method: (value) => value.toString()
    },
    number: {
        expected: ['string', 'number'],
        method: (value) => +value
    },
    date: {
        expected: ['string', 'object'],
        method: (value) => value.toString()
    }
};

module.exports.EXPECTED_TYPES = {
    pet: {
        name: expectedConstant.string,
        age: expectedConstant.number,
        breed: expectedConstant.string,
        tags: expectedConstant.number,
        status: expectedConstant.string
    },
    examination: {
        petId: expectedConstant.string,
        description: expectedConstant.string,
        scheduleTime: expectedConstant.string
    }
};
module.exports.FEATURES = features;
module.exports.ALLOWED_FEATURES_ERROR = (type) => {
    return { error: `Only ${features[type].join(', ')} are allowed.` }
};
module.exports.REQUIRED_FEATURES_ERROR = (type) => {
    return { error: `${features[type].slice(0, features[type].length - 1).join(', ')} and ${features[type][features[type].length-1]} are required.`}
};
module.exports.EXAMINATION_EXIST_ERROR = {error: 'Examination does not exist!'};
module.exports.PET_EXIST_ERROR = {error: "Pet with that ID does not exist."};
module.exports.BAD_VALUE_TYPES = { error: 'Bad values sent' };

module.exports.CONFIG = { secret: 'supersecret' };

