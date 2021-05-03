// Setting route controllers for all endpoint of th app
//const express = require("express"); //or Router() needed;


module.exports = (app) => {
  const gameController = require("../api/game.controller.js");

  // Delete a Playger with playerId
  app.post("/players:", gameController.createOne);

  // Play one Game
  app.post("/players/:playerId/games/:", gameController.playOneGame);

  // Retrieve all players from database
  app.get("/players/:", gameController.findAll);

  // Retrieve a single player data by playerId
  app.get("/players/:playerId", gameController.findOne);

  // Retrieve a single player score list
  app.get("/players/:playerId/games:", gameController.gamesAll);

  // Retrieve average ranking of all  players
  app.get("/players/ranking/:", gameController.findRanking);

  // Retrieve worst player
  app.get("/players/ranking/loser:", gameController.findWorst);

  // Retrieve best player
  app.get("/players/ranking/winner:", gameController.findBest);

  // Delete a Player with playerId
  app.delete("/players/:playerId/games:", gameController.deleteAll);

  // Page not available
  app.all("*", (req, res) => {
    res.status(404).send("ERROR 404. This page is not available.");
  });
};
