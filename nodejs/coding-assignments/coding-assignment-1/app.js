const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();
app.use(express.json());
const dbPath = path.join(__dirname, "todoApplication.db");
var isValid = require("date-fns/isValid");
const format = require("date-fns/format");
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
  const {
    status = "",
    priority = "",
    search_q = "",
    category = "",
    date = "",
  } = request.query;
  const query = `select id ,todo ,
    priority,category,status,due_date as dueDate from todo where
    status like '%${status}%' and priority like '%${priority}%' and todo like '%${search_q}%' and category like '%${category}%';`;
  const result = await db.all(query);

  if (status == "" && priority != "" && category == "") {
    if (priority != "HIGH") {
      response.status(400);
      response.send("Invalid Todo Priority");
    } else {
      response.send(result);
    }
  } else if (status != "" && priority == "" && category == "") {
    if (status != "TO DO") {
      response.status(400);
      response.send("Invalid Todo Status");
    } else {
      response.send(result);
    }
  } else if (status != "" && category != "") {
    response.send(result);
  } else if (status != "" && priority != "") {
    response.send(result);
  } else if (search_q != "") {
    response.send(result);
  } else if (status == "" && category != "" && priority == "") {
    if (category != "HOME") {
      response.status(400);
      response.send("Invalid Todo Category");
    } else {
      response.send(result);
    }
  } else if (category != "" && priority != "") {
    response.send(result);
  }
});
app.get("/todos/:todoId/", async (request, response) => {
  const { todoId } = request.params;
  const query = `select id ,todo ,
    priority,category,status,due_date as dueDate from todo
    where id=${todoId} ;`;
  const result = await db.get(query);
  response.send(result);
});
app.get("/agenda/", async (request, response) => {
  const { date } = request.query;

  if (!isValid(new Date(date))) {
    response.status(400);
    response.send("Invalid Due Date");
  } else {
    const dueDate = format(new Date(date), "yyyy-MM-dd");
    const query = `select id ,todo ,
    priority,status,category,due_date as dueDate from todo
    where due_date='${dueDate}';`;
    const result = await db.all(query);
    response.send(result);
  }
});
app.post("/todos/", async (request, response) => {
  const {
    id = "",
    todo = "",
    priority = "",
    status = "",
    category = "",
    dueDate = "",
  } = request.body;

  if (!["HIGH", "MEDIUM", "LOW"].includes(priority)) {
    response.status(400);
    response.send("Invalid Todo Priority");
  } else if (!["TO DO", "IN PROGRESS", "DONE"].includes(status)) {
    response.status(400);
    response.send("Invalid Todo Status");
  } else if (!["WORK", "HOME", "LEARNING"].includes(category)) {
    response.status(400);
    response.send("Invalid Todo Category");
  } else if (!isValid(new Date(dueDate))) {
    response.status(400);
    response.send("Invalid Due Date");
  } else {
    const due = format(new Date(dueDate), "yyyy-MM-dd");
    const insertQuery = `insert into
  todo (id,todo,priority,status,category,due_date)
  values(${id},'${todo}','${priority}','${status}','${category}','${due}')`;
    await db.run(insertQuery);
    response.send("Todo Successfully Added");
  }
});
app.put("/todos/:todoId/", async (request, response) => {
  const { todoId } = request.params;
  const query = `select * from todo where id=${todoId};`;
  const row = await db.get(query);
  const {
    todo = row.todo,
    priority = row.priority,
    status = row.status,
    category = row.category,
    dueDate = row.due_date,
  } = request.body;
  const date = new Date(dueDate);
  const insertQuery = `update todo set
  todo='${todo}',
  priority='${priority}',
  status='${status}',
  category='${category}',
  due_date='${dueDate}'
  where id=${todoId}`;
  await db.run(insertQuery);
  if (todo != row.todo) {
    response.send("Todo Updated");
  }

  if (priority != row.priority) {
    if (!["HIGH", "MEDIUM", "LOW"].includes(priority)) {
      response.status(400);
      response.send("Invalid Todo Priority");
    } else {
      response.send("Priority Updated");
    }
  }
  if (status != row.status) {
    if (!["TO DO", "IN PROGRESS", "DONE"].includes(status)) {
      response.status(400);
      response.send("Invalid Todo Status");
    } else {
      response.send("Status Updated");
    }
  }
  if (category != row.category) {
    if (!["WORK", "HOME", "LEARNING"].includes(category)) {
      response.status(400);
      response.send("Invalid Todo Category");
    } else {
      response.send("Category Updated");
    }
  }
  if (dueDate != row.due_date) {
    if (!isValid(date.getFullYear(), date.getMonth() + 1, date.getDate())) {
      response.status(400);
      response.send("Invalid Due Date");
    } else {
      response.send("Due Date Updated");
    }
  }
});
app.delete("/todos/:todoId/", async (request, response) => {
  const { todoId } = request.params;
  const del = `delete from todo where id=${todoId}`;
  await db.run(del);
  response.send("Todo Deleted");
});

module.exports = app;
