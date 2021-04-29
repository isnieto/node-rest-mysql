// Setting route controllers for all endpoint of th app
const express = require("express"); //or Router() needed;

/* These are routes we define:

POST: /players : crea un jugador
PUT /players : modifica el nom del jugador
POST /players/{id}/games/ : un jugador específic realitza una tirada dels daus.
DELETE /players/{id}/games: elimina les tirades del jugador
[DONE] GET /players/: retorna el llistat de tots els jugadors del sistema amb el seu percentatge mig d’èxits
[DONE] GET /players/{id}/games: retorna el llistat de jugades per un jugador.
[IN PROCESS] GET /players/ranking: retorna el ranking mig de tots els jugadors del sistema. És a dir, el percentatge mig d’èxits.
[IN PROCESS] GET /players/ranking/loser: retorna el jugador amb pitjor percentatge d’èxit
[IN PROCESS] GET /players/ranking/winner: retorna el jugador amb millor percentatge d’èxit*/

module.exports = (app) => {
  const game = require("../api/game.controller.js");

  // Delete a Playger with playerId
  //app.post("/players:", game.createOne);
  app.post("/players:", game.checkPlayer);

  // Delete a Playger with playerId
  app.post("/players/:playerId/games/:", game.playOneGame);

  // Retrieve all players from database
  app.get("/players/:", game.findAll);

  // Retrieve a single player data by playerId
  app.get("/players/:playerId", game.findOne);

  // Retrieve a single player score list
  app.get("/players/:playerId/games:", game.gamesAll);

  // Retrieve average ranking of all  players
  app.get("/players/ranking/:", game.findRanking);

  // Retrieve worst player
  app.get("/players/ranking/loser:", game.findWorst);

  // Retrieve best player
  app.get("/players/ranking/winner:", game.findBest);

  // Delete a Playger with playerId
  app.delete("/players/:playerId/games:", game.deleteAll);

  // Page not available
  app.all("*", (req, res) => {
    res.status(404).send("ERROR 404. This page is not available.");
  });
};
