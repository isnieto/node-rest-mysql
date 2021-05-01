//const { restart } = require("nodemon");
const Game = require("../models/game.model.js");
const Player = require("../models/player.model.js");
const playGame = require("../services/games.services.js");

// Retrieve all games from the database.

module.exports = {
  // Create one player
  createOne: async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      await Player.newPlayer("Anonimo");
      res.status(201).json({message: "New player added as anonymus"});
    } 
      let checked = await Player.checkIfPlayerExists(req.body.name);
      if (checked === null){
        res.status(404).json({checked})
      } else {
        res.status(501).json({"message": "player already exists", checked})
      }
   /*  }
      try {
       
        if (checked.length === 0) {
          await Player.newPlayer(req.body.name);
          res.status(201).json({message: "New player added!"});
        } else {
          res.status(501).json({message: "Sorry, player already exists."});
        }
      } catch (e) {
        let error =  "salta";
        res.status(500).json({error, e});
      } */
  },

  playOneGame: async (req, res, next) => {
    try {
      let playerId = req.params.playerId;
      let score = await playGame();
      await Game.addScore(playerId, score);
      res.status(201).json({message: "New game added!"});
    } catch (e) {
      res.status(404).json({ error: e });
    } 
  },

  findAll: async (req, res) => {
    try {
      const results = await Player.getAllPlayers();
      res.status(200).send(results);
    } catch (e) {
      console.log(e.message);
      res.sendStatus(500);
    }
  },

  //Retrieve a single object
  findOne: async (req, res) => {
    try {
      const results = await Player.findById(req.params.playerId);
      res.status(200).send(results);
    } catch (e) {
      console.log(e.message);
      res.sendStatus(500);
    }
  },

  // Retrieve a single player score list
  gamesAll: async (req, res) => {
    try {
      const results = await Game.getAllScoresFromPlayer(req.params.playerId);
      res.status(200).send(results);
    } catch (e) {
      console.log(e.message);
      res.sendStatus(500);
    }
  },

  // Retrieve Ranking of all players
  findRanking: async (req, res) => {
    try {
      const results = await Game.getRanking();
      res.status(200).send(results);
    } catch (e) {
      console.log(e.message);
      res.sendStatus(500);
    }
  },

  // Retrieve best player
  findWorst: async (req, res) => {
    try {
      const results = await Game.findLoser();
      res.status(200).send(results);
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
      res.status(200).send(results);
    } catch (e) {
      console.log(e.message);
      res.sendStatus(400);
    }
  },
}; // End Module
