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
    game.findWinner((err, data) => {
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

  // Update player name
  updatePlayer: (req, res) => {
    if (!req.body) {
      res.send("Content can NOT be empty!");
    } else {
      res.send("We got the data " + req.body);
      updateById(req.body);
    }
  },

  // Create new player
  createNewPlayer: (req, res) => {
    if (!req.body.nickName) {
      return res.status(400).send({
        nickName: "Sorry, name can not be empty!",
      });
    } else {
      // Create a new Player
      const player = new game(req.body.nickName);
      game.checkPlayerName(player, (err, data) => {
        if (err) {
          res.status(500).send({
            message: err.message || "Some error occurred while sending `data`.",
          });
        } else {
          if (!res.send) {
            console.log("Player already in Database");
          } else {
            console.log("Player can be added  in Database");
          }
        }
      });

      /* game.newPlayer(player, (err, data) => {
          if (err) {
            res.status(500).send({
              message: err.message || "Some error occurred while sending `data`.",
            });
          } else {
             res.send("new Player added");
          }
        }); */
    }
  },
}; // End Module
