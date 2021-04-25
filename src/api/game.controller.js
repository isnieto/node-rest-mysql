const game = require("../models/game.model.js");


//Create a new object

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Customer
  const player = new Game({
    playerName: req.body.playerName,
    date: req.body.date
  });

  // Save Customer in the database
  Customer.create(customer, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    else res.send(data);
  });
};

// Retrieve all games from the database.
exports.findAll = (req, res) => {
  game.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving `data`.",
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
          message: `Not found player with id ${req.params.playerId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving player with id " + req.params.playerId
        });
      }
    } else res.send(data);
  });
};
