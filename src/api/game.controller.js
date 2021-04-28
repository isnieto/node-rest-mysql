const Game = require("../models/Game.model.js");
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
        res.status(201).send(results);
      } catch (e) {
        console.log(e.message);
        res.sendStatus(500);
      }
    }
  },

  playOneGame: async (req, res) => {
    try {
      let playerId = req.params.playerId;
      let score = gameplay;
      await Game.addScore(playerId, score);
      res.status(201);
    } catch (e) {
      console.log(e.message);
      res.sendStatus(500);
    }
  },
}; // End Module
