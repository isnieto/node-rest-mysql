// Setting route controllers for all endpoint of th app
//const express = require("express"); for Router() needed;

/* These are routes we define:

/players: GET, POST, DELETE
/players/:playerId: GET, PUT, DELETE */
module.exports = (app) => {
  
  const players = require("../api/game.controller.js");

  // Retrieve all players from database
  app.get("/players", players.findAll);

  // Page not available
  app.all("*", (req, res) => {
    res.status(404).send("Ops. Page not available at this moment");
  });
};
