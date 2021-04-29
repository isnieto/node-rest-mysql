//const { restart } = require("nodemon");
const Game = require("../models/game.model.js");
const gameplay = require("../services/games.services.js");

// Retrieve all games from the database.

module.exports = {
  findAll: async (req, res) => {
    try {
      const results = await Game.getAllPlayers();
      res.status(201).send(results);
    } catch (e) {
      console.log(e.message);
      res.sendStatus(500);
    }
  },

  //Retrieve a single object
  findOne: async (req, res) => {
    try {
      const results = await Game.findById(req.params.playerId);
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

  // Retrieve worst player
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

  // Create one player
  createOne: async (req, res) => {
    if (Object.keys(req.body).length === 0) {
      console.log("Empty content. It can not be empty!");
      res.status(400).send({
        message: "Player needs a nickname!",
      });
    } else {
      console.log(req.body);
      try {
        const player = new Game(req.body.name);
        await Game.newPlayer(player.nickName);
        res.json({ status: `New game added ${player.nickName}` });
      } catch (e) {
        res.status(500).json({ error: e.message });
      }
    }
  },

  playOneGame: async (req, res) => {
    try {
      let playerId = req.params.playerId;
      let score = await gameplay();
      await Game.addScore(playerId, score);
      res.json({ status: "New game added" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  },

  checkPlayer: async (req, res) => {
    try {
      let playerName = req.body.name;
      let data = await Game.checkIfPlayer(playerName);
      res.status(200).json({ info: `${data}` });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
    return res;
  },
}; // End Module
