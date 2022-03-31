const addDays = require("date-fns/addDays");
function hello(days) {
  const result = addDays(new Date(2020, 7, 22), days);

  return (
    result.getDate() +
    "-" +
    (result.getMonth() + 1) +
    "-" +
    result.getFullYear()
  );
}
console.log(hello(2));
module.exports = hello;
