const expected = {
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
const exp = {
    pet: {
        name: expected.string,
        age: expected.number,
        breed: expected.string,
        tags: expected.number,
        status: expected.string
    },
    examination: {
        petId: expected.string,
        description: expected.string,
        scheduleTime: expected.string
    }
};

module.exports = (req, res, next) => {
    const {body: pet} = req;

    const [ ,type ]= req.originalUrl.split('/');

    if (Object.keys(pet)
        .filter((key) => !exp[type][key].expected.includes(typeof pet[key]))
        .length > 0) {
        return res.status(400).json({error: 'Bad values sent'});
    }
    Object.keys(pet)
        .forEach((key) => {
            pet[key] = exp[type][key].method(pet[key])
        });

    return next();
}