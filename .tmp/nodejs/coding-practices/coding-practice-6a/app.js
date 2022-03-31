const express = require("express");
const path = require("path");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();
app.use(express.json());
const dbPath = path.join(__dirname, "covid19India.db");

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
app.get("/states/", async (request, response) => {
  const listStates = `select  state_id as stateId,state_name as stateName,
population from state;`;
  const result = await db.all(listStates);
  response.send(result);
});
app.get("/states/:stateId/", async (request, response) => {
  const { stateId } = request.params;
  const listStates = `select  state_id as stateId,state_name as stateName,
population from state where state_id=${stateId};`;
  const result = await db.get(listStates);
  response.send(result);
});
app.post("/districts/", async (request, response) => {
  const { districtName, stateId, cases, cured, active, deaths } = request.body;
  const insertRow = `insert into district(district_name,state_id,cases,cured,active,deaths)
values('${districtName}',${stateId},${cases},${cured},${active},${deaths});`;
  await db.run(insertRow);
  response.send("District Successfully Added");
});
app.get("/districts/:districtId/", async (request, response) => {
  const { districtId } = request.params;
  const listDistrict = `select  
  district_id as districtId,
  district_name as districtName,
  state_id as stateId,
  cases,cured,active,deaths
  from district where district_id=${districtId};`;
  const result = await db.get(listDistrict);
  response.send(result);
});
app.delete("/districts/:districtId/", async (request, response) => {
  const { districtId } = request.params;
  const de = `delete from district where district_id=${districtId};`;
  await db.run(de);
  response.send("District Removed");
});
app.put("/districts/:districtId/", async (request, response) => {
  const { districtId } = request.params;
  const { districtName, stateId, cases, cured, active, deaths } = request.body;
  const up = `update
district set
district_name='${districtName}',
state_id=${stateId},
cases=${cases},
cured=${cured},
active=${active},
deaths=${deaths}
where district_id=${districtId};`;
  await db.run(up);
  response.send("District Details Updated");
});

app.get("/states/:stateId/stats/", async (request, response) => {
  const { stateId } = request.params;
  const listStats = `select  
  sum(cases) as totalCases,
  sum(cured) as totalCured,
  sum(active) as totalActive,
  sum(deaths) as totalDeaths
  from state inner join district on state.state_id=district.state_id
   where state.state_id=${stateId} group by district.state_id;`;
  const result = await db.get(listStats);
  response.send(result);
});
app.get("/districts/:districtId/details/", async (request, response) => {
  const { districtId } = request.params;
  const getStateName = `select state_name as stateName from state join district
  on state.state_id=district.state_id group by district_id;`;
  const result = await db.get(getStateName);
  response.send(result);
});
module.exports = app;
