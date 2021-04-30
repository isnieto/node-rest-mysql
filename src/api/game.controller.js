//const { restart } = require("nodemon");
const Game = require("../models/game.model.js");
const Player = require("../models/player.model.js");
const playGame = require("../services/games.services.js");

// Retrieve all games from the database.

module.exports = {
  // Create one player
  createOne: async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      await Player.newPlayer("ANÓNIMUS");
      status.msg = "success";
      status.code = 200;
      res.json(status.msg);
    }
    try {
      let temp = await Player.checkIfPlayerExists(req.body.name);
      if (!temp) {
        await Player.newPlayer(req.body.name);
        status.msg = "success";
        status.code = 200;
        res.json(status.msg);
      } else {
        status.msg = "Sorry, Name already in database";
        status.code = 400;
        res.json(status.msg);
      }
      
    } catch (e) {
      res.status(500);
    }
  },

  playGame: async (req, res) => {
    try {
      let playerId = req.params.playerId;
      let score = await playGame();
      let result = await Game.addScore(playerId, score);
      res.json({ status: "New game added" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  },

  findAll: async (req, res) => {
    try {
      const results = await Player.getAllPlayers();
      res.status(201).send(results);
    } catch (e) {
      console.log(e.message);
      res.sendStatus(500);
    }
  },

  //Retrieve a single object
  findOne: async (req, res) => {
    try {
      const results = await Player.findById(req.params.playerId);
      res.status(201).send(results);
    } catch (e) {
      console.log(e.message);
      res.sendStatus(500);
    }
  },

  // Retrieve a single player score list
  gamesAll: async (req, res) => {
    try {
      const results = await Game.getAllScoresFromPlayer(req.params.playerId);
      res.status(201).send(results);
    } catch (e) {
      console.log(e.message);
      res.sendStatus(500);
    }
  },

  // Retrieve Ranking of all players
  findRanking: async (req, res) => {
    try {
      const results = await Game.getRanking();
      res.status(201).send(results);
    } catch (e) {
      console.log(e.message);
      res.sendStatus(500);
    }
  },

  // Retrieve best player
  findWorst: async (req, res) => {
    try {
      const results = await Game.findLoser();
      res.status(201).send(results);
    } catch (e) {
      console.log(e.message);
      res.sendStatus(500);
    }
  },

  // Retrieve best player
  findBest: async (req, res) => {
    try {
      const results = await Game.findWinner();
      res.status(201).send(results);
    } catch (e) {
      console.log(e.message);
      res.sendStatus(500);
    }
  },

  // Delete one player by ID
  deleteAll: async (req, res) => {
    try {
      const results = await Game.deleteGames(req.params.playerId);
      res.status(201).send(results);
    } catch (e) {
      console.log(e.message);
      res.sendStatus(500);
    }
  },
}; // End Module
