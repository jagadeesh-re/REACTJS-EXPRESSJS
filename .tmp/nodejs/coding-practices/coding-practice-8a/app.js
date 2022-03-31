const express = require("express");
const path = require("path");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();
app.use(express.json());
const dbPath = path.join(__dirname, "todoApplication.db");

let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();
app.get("/todos/", async (request, response) => {
  const { status = "", priority = "", search_q = "" } = request.query;
  const getTodo = `select * from todo where status like '%${status}%'
  and priority like '%${priority}%' and todo like '%${search_q}%';`;
  const res = await db.all(getTodo);
  console.log(res);
  response.send(res);
});
app.get("/todos/:todoId/", async (request, response) => {
  const { todoId } = request.params;
  const getTodo = `select * from todo where id=${todoId};`;
  const res = await db.get(getTodo);
  response.send(res);
});
app.post("/todos/", async (request, response) => {
  const { id, todo, priority, status } = request.body;
  const insertTodo = `insert into todo(id,todo,priority,status)
values(${id},'${todo}','${priority}','${status}');`;
  await db.run(insertTodo);
  response.send("Todo Successfully Added");
});
app.put("/todos/:todoId/", async (request, response) => {
  const { todoId } = request.params;

  const data = request.body;

  const { status, priority, todo } = data;

  if (status != undefined) {
    const up = `update todo 
    set
  status='${status}'
   where id=${todoId}`;
    await db.run(up);
    response.send("Status Updated");
  } else if (priority != undefined) {
    const up = `update todo set priority='${priority}'where id=${todoId}`;
    await db.run(up);

    response.send("Priority Updated");
  } else if (data.todo != undefined) {
    const up = `update todo 
  set todo='${todo}' 
 
   where id=${todoId}`;
    await db.run(up);
    response.send("Todo Updated");
  }
});
app.delete("/todos/:todoId/", async (request, response) => {
  const { todoId } = request.params;
  const del = `delete from todo where id=${todoId};`;
  await db.run(del);
  response.send("Todo Deleted");
});
module.exports = app;
