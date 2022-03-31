const format = require("date-fns/format");
const dateObject1 = new Date();
console.log(dateObject1);
const date = "";

var isValid = require("date-fns/isValid");
console.log(isValid(new Date(date)));
const result = format(new Date(date), "yyyy-MM-dd");
