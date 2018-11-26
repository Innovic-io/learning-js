module.exports = (req, res, next) => {
    const expected = {
        pet: ['name', 'age', 'breed', 'status', 'tags'],
        examination: [ 'petId', 'description', 'scheduleTime']
    };
    const {body: sentPet} = req;
    const [ ,type ]= req.originalUrl.split('/');
    if (Object.keys(sentPet).filter((key) => !expected[type].includes(key)).length > 0) {
        return res.status(400).json({error: `Only ${expected[type].join(', ')} are allowed.`});
    }
    if (req.method === 'POST' && expected[type].filter((key) => !sentPet[key]).length > 0) {
        return res.status(400)
            .json({
                error: `${expected[type].slice(0, expected[type].length - 1).join(', ')} and ${expected[type][expected[type].length-1]} are required`
            });
    }
    return next();
};