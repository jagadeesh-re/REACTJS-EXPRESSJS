const getFirstNames = require("../utilities/utils/index");
const obj = require("../country/state/city/index");

module.exports = function getPeopleInCity(obj) {
  const list = getFirstNames(obj);

  return list;
};
