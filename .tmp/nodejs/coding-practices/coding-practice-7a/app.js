const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();
app.use(express.json());
const dbPath = path.join(__dirname, "cricketMatchDetails.db");

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
      player_id as playerId,
      player_name as  playerName
    FROM
      player_details;`;
  const re = await db.all(getPlayerQuery);
  response.send(re);
});

app.get("/players/:playerId/", async (request, response) => {
  const { playerId } = request.params;
  const getPlayerQuery = `
    SELECT
       player_id as playerId,
      player_name as  playerName
    FROM
      player_details where player_id= ${playerId};`;
  const player = await db.get(getPlayerQuery);

  response.send(player);
});
app.put("/players/:playerId/", async (request, response) => {
  const { playerName } = request.body;
  const { playerId } = request.params;
  const insertPlayerQuery = ` update player_details set 
   player_name='${playerName}'
  where player_id=${playerId} ;`;
  await db.run(insertPlayerQuery);
  response.send("Player Details Updated");
});

app.get("/matches/:matchId/", async (request, response) => {
  const { matchId } = request.params;
  const getPlayerQuery = `
    SELECT
      match_id as matchId,
      match,
      year
      from
      match_details where match_id= ${matchId};`;
  const player = await db.get(getPlayerQuery);
  response.send(player);
});

app.get("/players/:playerId/matches/", async (request, response) => {
  const { playerId } = request.params;
  console.log(playerId);
  const getPlayerQuery = ` SELECT
      match_details.match_id as matchId,
      match ,
      year
    FROM
      match_details inner join player_match_score on match_details.match_id=player_match_score.match_id
     where player_match_score.player_id=${playerId};`;
  const re = await db.all(getPlayerQuery);
  console.log(re);
  response.send(re);
});
app.get("/matches/:matchId/players/", async (request, response) => {
  const { matchId } = request.params;
  const getPlayerQuery = ` SELECT
   player_match_score.player_id as playerId,
     player_name as playerName
    FROM
      player_details inner join player_match_score on player_details.player_id=player_match_score.player_id
     where player_match_score.match_id=${matchId} ;`;
  const re = await db.all(getPlayerQuery);
  response.send(re);
});
app.get("/players/:playerId/playerScores/", async (request, response) => {
  const { playerId } = request.params;
  const getPlayerQuery = ` SELECT
   player_match_score.player_id as playerId,
   player_name as playerName,
   sum(score) as totalScore,
   sum(fours) as totalFours,
   sum(sixes) as totalSixes
    FROM
      player_details inner join player_match_score on player_details.player_id=player_match_score.player_id
     where player_match_score.player_id=${playerId} group by playerId;`;
  const re = await db.get(getPlayerQuery);
  response.send(re);
});
module.exports = app;
