const express = require("express");
const path = require("path");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();
app.use(express.json());
const dbPath = path.join(__dirname, "moviesData.db");

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

app.get("/movies/", async (request, response) => {
  const moviesQuery = `select movie_name as movieName from movie;`;
  const movieNameArray = await db.all(moviesQuery);
  console.log(movieNameArray);
  response.send(movieNameArray);
});
app.post("/movies/", async (request, response) => {
  const { directorId, movieName, leadActor } = request.body;
  const insertMovieQuery = `insert into movie(director_id,movie_name,lead_actor)
    values(${directorId},'${movieName}','${leadActor}')`;
  const res = await db.run(insertMovieQuery);
  response.send("Movie Successfully Added");
});
app.get("/movies/:movieId/", async (request, response) => {
  const { movieId } = request.params;
  const getMovie = `select movie_id as movieId,director_id as directorId,
  movie_name as movieName,lead_actor as leadActor from movie where
  movie_id=${movieId};`;
  const getSingleQuery = await db.get(getMovie);
  response.send(getSingleQuery);
});
app.put("/movies/:movieId/", async (request, response) => {
  const { movieId } = request.params;
  const reqDetails = request.body;
  const { directorId, movieName, leadActor } = reqDetails;

  const updateMovie = `update movie set
    director_id=${directorId},
    movie_name='${movieName}',
    lead_actor='${leadActor}'
    where movie_id=${movieId};`;
  await db.run(updateMovie);
  response.send("Movie Details Updated");
});
app.delete("/movies/:movieId/", async (request, response) => {
  const { movieId } = request.params;
  const deleteQuery = `delete from movie where movie_id=${movieId};`;
  await db.run(deleteQuery);
  response.send("Movie Removed");
});
app.get("/directors/", async (request, response) => {
  const directorQuery = `select director_id as directorId,director_name as directorName from director;`;
  const directorNameArray = await db.all(directorQuery);
  console.log(directorNameArray);
  response.send(directorNameArray);
});
app.get("/directors/:directorId/movies/", async (request, response) => {
  const { directorId } = request.params;
  const getMovieQuery = `select movie_name as movieName from movie where director_id
    =${directorId};`;
  const result = await db.all(getMovieQuery);
  response.send(result);
});

module.exports = app;
