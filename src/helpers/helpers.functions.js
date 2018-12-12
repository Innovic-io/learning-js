const uuid = require("uuid");
const deepCopy = toCopy => JSON.parse(JSON.stringify(toCopy));

module.exports.deepCopy = deepCopy;

module.exports.addIdPushAndReturn = (obj, objects) => {
  const copy = deepCopy(obj);
  copy.id = uuid();
  objects.push(copy);
  return copy;
};

module.exports.getKeys = (element, fieldsArray) =>
  Object.assign(
    {},
    ...Object.keys(element)
      .filter(el =>
        fieldsArray
          .split(",")
          .concat("id")
          .map(el => el.trim())
          .includes(el)
      )
      .map(remainingKey => ({
        [remainingKey]: element[remainingKey]
      }))
  );

module.exports.getLength = ({ skip, offset }) => {
  const result = [+skip || 0];
  if (offset) {
    result.push((+skip || 0) + (+offset || 0));
  }

  return result;
};
