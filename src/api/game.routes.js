// Setting route controllers for all endpoint of th app
const express = require("express");


/* These are routes we define:

/players: GET, POST, DELETE
/players/:playerId: GET, PUT, DELETE */
module.exports = app => {
  const players = require("../api/game.controller.js");

  // Retrieve all players
  app.get("/players", players.findAll);

};