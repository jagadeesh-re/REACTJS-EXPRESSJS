const express = require("express");
const app = express();
app.get("/", (request, response) => {
  let date = new Date();
  let st =
    date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
  console.log(st);
  response.send(st);
});
module.exports = app;
