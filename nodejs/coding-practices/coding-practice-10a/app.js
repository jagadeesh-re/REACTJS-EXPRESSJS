const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();
app.use(express.json());
const dbPath = path.join(__dirname, "covid19IndiaPortal.db");
const jwt = require("jsonwebtoken");
let db = null;
const initializeDBAndServer = async () => {
  try {
    db = await open({ filename: dbPath, driver: sqlite3.Database });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};
initializeDBAndServer();
let payload;
//token authentication or verification
const authenticateToken = (request, response, next) => {
  let jwtToken;
  const authHeader = request.headers["authorization"];
  if (authHeader !== undefined) {
    jwtToken = authHeader.split(" ")[1];
  }
  if (jwtToken === undefined) {
    response.status(401);
    response.send("Invalid JWT Token");
  } else {
    jwt.verify(jwtToken, "secret", async (error, payload) => {
      if (error) {
        response.status(401);
        response.send("Invalid JWT Token");
      } else {
        request.username = payload.username;
        next();
      }
    });
  }
};
//login
app.post("/login/", async (request, response) => {
  const { username, password } = request.body;
  payload = { username: username };
  const userCheck = `select * from user where username='${username}';`;
  const userRow = await db.get(userCheck);
  if (userRow == undefined) {
    response.status(400);
    response.send("Invalid user");
  } else {
    const dbPasswordCheck = await bcrypt.compare(password, userRow.password);
    if (dbPasswordCheck === true) {
      response.status(200);
      const jwtToken = jwt.sign(payload, "secret");
      response.send({ jwtToken });
    } else {
      response.status(400);
      response.send("Invalid password");
    }
  }
});
app.get("/states/", authenticateToken, async (request, response) => {
  const getStates = `select state_id as stateId,state_name as stateName,population from state ;`;
  const result = await db.all(getStates);
  response.send(result);
});
app.get("/states/:stateId/", authenticateToken, async (request, response) => {
  const { stateId } = request.params;
  const getStates = `select state_id as stateId,state_name as stateName,population from state where state_id=${stateId};`;
  const result = await db.get(getStates);
  response.send(result);
});
app.post("/districts/", authenticateToken, async (request, response) => {
  const { districtName, stateId, cases, cured, active, deaths } = request.body;
  const getStates = `insert into district(district_name,state_id,cases,cured,active,deaths) values('${districtName}',${stateId},${cases},${cured},${active},${deaths}) ;`;
  const result = await db.run(getStates);
  response.send("District Successfully Added");
});
app.get(
  "/districts/:districtId/",
  authenticateToken,
  async (request, response) => {
    const { districtId } = request.params;
    const getStates = `select district_id as districtId,district_name as districtName,state_id as stateId, cases,cured,active,deaths from district where district_id=${districtId};`;
    const result = await db.get(getStates);
    response.send(result);
  }
);
app.delete(
  "/districts/:districtId/",
  authenticateToken,
  async (request, response) => {
    const { districtId } = request.params;
    const getStates = `delete from district where district_id=${districtId};`;
    await db.run(getStates);
    response.send("District Removed");
  }
);
app.put(
  "/districts/:districtId/",
  authenticateToken,
  async (request, response) => {
    const { districtId } = request.params;
    const {
      districtName,
      stateId,
      cases,
      cured,
      active,
      deaths,
    } = request.body;
    const getStates = `update district set district_name='${districtName}', state_id=${stateId}, cases=${cases}, cured=${cured}, active=${active}, deaths=${deaths} where district_id=${districtId};`;
    await db.run(getStates);
    response.send("District Details Updated");
  }
);
app.get(
  "/states/:stateId/stats/",
  authenticateToken,
  async (request, response) => {
    const { stateId } = request.params;
    const getStates = `select sum(cases) as totalCases, sum(cured) as totalCured, sum(active) as totalActive, sum(deaths) as totalDeaths from state join district on state.state_id=district.state_id where district.state_id=${stateId};`;
    const result = await db.get(getStates);
    response.send(result);
  }
);
module.exports = app;
