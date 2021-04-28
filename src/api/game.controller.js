const game = require("../models/game.model.js");

// Retrieve all games from the database.

module.exports = {
  findAll: async (req, res) => {
    try {
      const results = await game.getAllPlayers();
      res.status(201).send(results);
    } catch (e) {
      console.log(e.message);
      res.sendStatus(500);
    }
  },

  //Retrieve a single object
  findOne: async (req, res) => {
    try {
      const results = await game.findById(req.params.playerId);
      res.status(201).send(results);
    } catch (e) {
      console.log(e.message);
      res.sendStatus(500);
    }
  },

  // Retrieve a single player score list
  gamesAll: async (req, res) => {
    try {
      const results = await game.getAllScoresFromPlayer(req.params.playerId);
      res.status(201).send(results);
    } catch (e) {
      console.log(e.message);
      res.sendStatus(500);
    }
  },

  // Retrieve worst player
  findRanking: async (req, res) => {
    try {
      const results = await game.getRanking();
      res.status(201).send(results);
    } catch (e) {
      console.log(e.message);
      res.sendStatus(500);
    }
  },

  // Retrieve best player
  findWorst: async (req, res) => {
    try {
      const results = await game.findLoser();
      res.status(201).send(results);
    } catch (e) {
      console.log(e.message);
      res.sendStatus(500);
    }
  },

  // Retrieve best player
  findBest: async (req, res) => {
    try {
      const results = await game.findWinner();
      res.status(201).send(results);
    } catch (e) {
      console.log(e.message);
      res.sendStatus(500);
    }
  },

  // Delete one player by ID
  deleteAll: async (req, res) => {
    try {
      const results = await game.deleteGames(req.params.playerId);
      res.status(201).send(results);
    } catch (e) {
      console.log(e.message);
      res.sendStatus(500);
    }
  },
}; // End Module
