const game = require("../models/game.model.js");

// Retrieve all games from the database.
exports.findAll = (req, res) => {
  game.getAllPlayers((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving `data`.",
      });
    else res.status(304).send(data);
  });
};

//Retrieve a single object
exports.findOne = (req, res) => {
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
};

// Retrieve a single player score list
exports.gamesAll = (req, res) => {
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
};

// Retrieve worst player
exports.findRanking = (req, res) => {
  game.getRanking((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "NO data found"
      });
    else res.send(data);
  });
};

// Retrieve worst player
exports.findWorst = (req, res) => {
  game.findLoser((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "NO data found"
      });
    else res.send(data);
  });
};

// Retrieve best player
exports.findBest = (req, res) => {
  game.findWinner((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "NO data found",
      });
    else res.send(data);
  });
};

// Update player name
exports.updatePlayer = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
}
