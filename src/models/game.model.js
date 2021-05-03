//  Import db.connection and Mysql Queries
const mysql = require("../config/db-connection.js");
const queries = require("../config/mysql-queries.js");

//  Player class and use the database connection above to add  CRUD methods:
class Game {
  // New Game
  static addScore(playerId, score) {
    return new Promise((reject, resolve) => {
      mysql.query(queries.addNewGame(playerId, score), (err, res) => {
        if (!err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  // Get all scores from one player
  static getAllScoresFromPlayer(playerId) {
    return new Promise((resolve, reject) => {
      mysql.query(queries.getScorePlayer(playerId), (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }

  // Get ranking of alls players PENDING retorna el jugador amb pitjor el percentatge mig d’èxits
  static getRanking() {
    return new Promise((resolve, reject) => {
      mysql.query(queries.getRankigAll, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }

  // Get ranking worst player PENDING retorna el jugador amb pitjor percentatge d’èxit
  static findLoser() {
    return new Promise((resolve, reject) => {
      mysql.query(queries.getWorstRanking, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }

  // Get ranking best player PENDING retorna el jugador amb millor percentatge d’èxit
  static findWinner() {
    return new Promise((resolve, reject) => {
      mysql.query(queries.getBestRanking, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }

  // Delete all games of one player
  static deleteGames(playerId) {
    return new Promise((resolve, reject) => {
      mysql.query(queries.deleteGamesPlayer(playerId), (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }
/* 
  static newPlayer(playerName) {
    return new Promise((reject, resolve) => {
      mysql.query(queries.createNewPlayer(playerName), (err, res) => {
        if (err) {
          reject(err);
        }
        let confirmation = "created player: " + playerName;
        console.log(confirmation);
        resolve(res);
      });
    });
  } */

  static addScore(playerId, result) {
    return new Promise((reject, resolve) => {
      mysql.query(queries.addNewGame(playerId, result), (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }
  // Check if PlayerName already existes in database
/*   static checkIfPlayer(playerName) {
    return new Promise((reject, resolve) => {
      mysql.query(queries.checkData(playerName), (err, res) => {
        // If Name no exists response is NULL
        if (res.length === 0) {
          console.log("Name not found in  database");
          resolve({ message: "Name not found in  database" });
        } else {
          reject(err);
        }
      });
    });
  } */
} // END CLass Game

// Export
module.exports = Game;
