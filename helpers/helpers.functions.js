const uuid = require('uuid');
const deepCopy = (toCopy) => JSON.parse(JSON.stringify(toCopy))

module.exports.deepCopy = deepCopy;

module.exports.addIdPushAndReturn = (obj, objects) => {
    const copy = deepCopy(obj);
    copy.id = uuid();
    objects.push(copy);
    return copy;
};

module.exports.getKeys = (element, fieldsArray) => Object.assign({}, ...Object.keys(element)
    .filter((el) => fieldsArray.includes(el))
    .map((remainingKey) => ({[remainingKey]: element[remainingKey]})));
