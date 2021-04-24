// Setting route controllers for all endpoint of th app
//const express = require("express"); for Router() needed;

/* These are routes we define:

/players: GET, POST, DELETE
/players/:playerId: GET, PUT, DELETE */


module.exports = (app) => {
  
  const game = require("../api/game.controller.js");

  // Retrieve all players from database
  app.get("/players", game.findAll);

   // Retrieve a single player with playerId
   app.get("/players/:playerId", game.findOne);

  // Page not available
  app.all("*", (req, res) => {
    res.status(404).send("Ops. Page not available at this moment");
  });
};
