//  Import db.connection
const mysql = require("./db.js");
const queries = require("./mysql-queries.js");

//  Player class and use the database connection above to add  CRUD methods:
class Game {
  constructor(playerName) {
    this.nickName = playerName;
  }

  // Get all data from players
  static getAllPlayers(result) {
    return new Promise((resolve, reject) => {
      mysql.query(queries.getAllPlayers, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(result(null, res));
      });
    });
  }

  // Get one player by ID
  static findById(playerId, result) {
    return new Promise((resolve, reject) => {
      mysql.query(queries.getOnePlayer(playerId), (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(result(null, res));
      });
    });
  } // Ende findByID

  // Get all scores from one player
  static getAllScoresFromPlayer(playerId, result) {
    return new Promise((resolve, reject) => {
      mysql.query(queries.getScorePlayer(playerId), (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(result(null, res));
      });
    });
  }
  // Get ranking of alls players PENDING retorna el jugador amb pitjor el percentatge mig d’èxits
  static getRanking(result) {
    return new Promise((resolve, reject) => {
      mysql.query(queries.getRankigAll, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(result(null, res));
      });
    });
  }
  // Get ranking worst player PENDING retorna el jugador amb pitjor percentatge d’èxit
  static findLoser(result) {
    return new Promise((resolve, reject) => {
      mysql.query(queries.getWortRanking, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(result(null, res));
      });
    });
  }
  // Get ranking best player PENDING retorna el jugador amb millor percentatge d’èxit
  static findWinner(result) {
    return new Promise((resolve, reject) => {
      mysql.query(queries.getBestRanking, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(result(null, res));
      });
    });
  }

  // Delete all games of one player
  static deleteGames(playerId, result) {
    return new Promise((resolve, reject) => {
      mysql.query(queries.deleteGamesPlayer(playerId), (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(result(null, res));
      });
    });
  }

  /*  static updateById(playerId, newName, result) {
    mysql.query(
      `UPDATE players SET nickName = ${newName} WHERE player_id=${playerId}`,
      (err, result) => {
        if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
      }
    );
  }
  static newPlayer(newPlayer, result) {
    mysql.query(
      `INSERT INTO players (nickName, registeredAt) VALUES ('${newPlayer.nickName}', CURDATE())`,
      (err, res) => {
        if (err) {
          res.send(err);
        }
        //console.log("players: ", res);
        result(null, res);
      }
    );
  }
  // Check if playerName already taken
  static checkPlayerName(newPlayer, result) {
    mysql.query(
      `SELECT nickName FROM players WHERE nickName = ${newPlayer.nickName}`,
      (err, res) => {
        if (err) {
          result(res, null);
        }
        console.log("players exists ");
        result(null, res);
      }
    );
  } */
} // END CLass Game

// Export
module.exports = Game;

/*
static newPlayer(newPlayer) {
    return new Promise((resolve, reject) => {
      mysql.query(`INSERT INTO players (nickName, registeredAt) VALUES ('${newPlayer}', CURDATE())`, (err, res) => {
        if (err) {
          reject(err);
        }
        //console.log("players: ", res);
        resolve( res);
      });
    });
  }
   */
