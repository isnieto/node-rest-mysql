const game = require("../models/game.model.js");

// Retrieve all games from the database.

module.exports = {
  findAll: (req, res) => {
    game.getAllPlayers((err, data) => {
      console.log(data);
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving `data`.",
        });
      else res.send(data);
    });
  },

  //Retrieve a single object
  findOne: (req, res) => {
    game.findById(req.params.playerId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found player with id ${req.params.playerId}.`,
          });
        } else {
          res.status(500).send({
            message: "Error retrieving player with id " + req.params.playerId,
          });
        }
      } else res.send(data);
    });
  },

  // Retrieve a single player score list
  gamesAll: (req, res) => {
    game.getAllScoresFromPlayer(req.params.playerId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found player with id ${req.params.playerId}.`,
          });
        } else {
          res.status(500).send({
            message: "Error retrieving player with id " + req.params.playerId,
          });
        }
      } else res.send(data);
    });
  },

  // Retrieve worst player
  findRanking: (req, res) => {
    game.getRanking((err, data) => {
      if (err)
        res.send({
          message: err.message || "NO data found",
        });
      else res.send(data);
    });
  },

  // Retrieve best player
  findWorst: (req, res) => {
    game.findLoser((err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "NO data found",
        });
      else res.send(data);
    });
  },

  // Retrieve best player
  findBest: (req, res) => {
    game.findWinner((err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "NO data found",
        });
      else res.send(data);
    });
  },

  // Delete one player by ID
  deleteAll: (req, res) => {
    game.deleteGames(req.params.playerId, (err, data) => {
      if (err)
      res.status(500).send({
        message: err.message || "NO data found",
      });
      else res.send(data);
    });

  }


  
}; // End Module
