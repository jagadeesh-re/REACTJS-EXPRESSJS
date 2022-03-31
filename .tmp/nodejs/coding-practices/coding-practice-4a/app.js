const express = require("express");
const path = require("path");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();
app.use(express.json());
const dbPath = path.join(__dirname, "cricketTeam.db");

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
app.get("/players/", async (request, response) => {
  const getPlayerQuery = `
    SELECT
      *
    FROM
      cricket_team;`;
  const playerArray = await db.all(getPlayerQuery);
  const modifiedPlayerArray = playerArray.map((player) => ({
    playerId: player.player_id,
    playerName: player.player_name,
    jerseyNumber: player.jersey_number,
    role: player.role,
  }));
  response.send(modifiedPlayerArray);
});
app.post("/players/", async (request, response) => {
  const { playerName, jerseyNumber, role } = request.body;
  const insertplayerQuery = `
insert into cricket_team(player_name,jersey_number,role)values('${playerName}',${jerseyNumber},'${role}');`;
  const res = await db.run(insertplayerQuery);
  response.send("Player Added to Team");
});
app.get("/players/:playerId/", async (request, response) => {
  const { playerId } = request.params;
  const getPlayerQuery = `
    SELECT
      *
    FROM
      cricket_team where player_id= ${playerId};`;
  const player = await db.get(getPlayerQuery);
  const modifiedPlayerArray = {
    playerId: player.player_id,
    playerName: player.player_name,
    jerseyNumber: player.jersey_number,
    role: player.role,
  };

  response.send(modifiedPlayerArray);
});
app.put("/players/:playerId/", async (request, response) => {
  const { playerName, jerseyNumber, role } = request.body;
  const { playerId } = request.params;
  const insertMovieQuery = `
   update cricket_team set player_id=${playerId},
   player_name='${playerName}',
   jersey_number=${jerseyNumber},
   role='${role}' where player_id=${playerId} ;`;
  await db.run(insertMovieQuery);
  response.send("Player Details Updated");
});
app.delete("/players/:playerId/", async (request, response) => {
  const { playerId } = request.params;

  const deleteMovieQuery = `delete from cricket_team where player_id=${playerId}`;
  await db.run(deleteMovieQuery);
  response.send("Player Removed");
});
module.exports = app;
