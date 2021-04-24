const player = require("../models/game.model.js");

// Retrieve all players from the database.
exports.findAll = (req, res) => {
  player.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving `players`.",
      });
    else res.status(304).send(data);
  });
};
