const express = require("express");
const addDays = require("date-fns/addDays");
const app = express();

app.get("/", (request, response) => {
  let date = new Date();
  let date_after = addDays(date, 100);
  let st =
    date_after.getDate() +
    "/" +
    (date_after.getMonth() + 1) +
    "/" +
    date_after.getFullYear();
  response.send(st);
});
app.listen(3000);
module.exports = app;
