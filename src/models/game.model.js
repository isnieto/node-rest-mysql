//  Import db.connection
const mysql = require("./db.js");

//  Player class and use the database connection above to add  CRUD methods:
class Game {
  constructor(playerName) {
    this.nickName = playerName;
  }
  // Get all data from players
  static getAllPlayers(result) {
    return new Promise((resolve, reject) => {
      mysql.query("SELECT * FROM players", (err, res) => {
        if (err) {
          reject(err);
        }
        //console.log("players: ", res);
        resolve(result(null, res));
      });
    });
  }
  // Get one player by ID
  static findById(playerId, result) {
    mysql.query(
      `SELECT * FROM players WHERE player_id = ${playerId}`,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }

        if (res.length) {
          console.log("found player: ", res[0]);
          result(null, res[0]);
          return;
        }

        // not found player with the id
        result({ player: "not_found" }, null);
      }
    );
  }
  // Get all scores from one player
  static getAllScoresFromPlayer(playerId, result) {
    mysql.query(
      `SELECT * FROM games WHERE player_id= ${playerId} ORDER BY round ASC`,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        console.log("scores: ", res);
        result(null, res);
      }
    );
  }
  // Get ranking of alls players PENDING retorna el jugador amb pitjor el percentatge mig d’èxits
  static getRanking(result) {
    mysql.query("SELECT * FROM games ORDER BY result DESC", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("Ranking: ", res);
      result(null, res);
    });
  }
  // Get ranking worst player PENDING retorna el jugador amb pitjor percentatge d’èxit
  static findLoser(result) {
    mysql.query("SELECT *, min(result) FROM games", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("loser: ", res);
      result(null, res);
    });
  }
  // Get ranking best player PENDING retorna el jugador amb millor percentatge d’èxit
  static findWinner(result) {
    mysql.query("SELECT *, max(result) FROM games", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("winner: ", res);
      result(null, res);
    });
  }
  static updateById(playerId, newName, result) {
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
            res.send( err);
          }
          //console.log("players: ", res);
          result(null, res);
        }
      );
  }
  // Check if playerName already taken
  static checkPlayerName(newPlayer, result) {
    mysql.query(
        `SELECT nickName FROM players WHERE nickName = ${newPlayer.nickName}`, (err, res) => {
          if (err) {
            result(res, null);
          }
          console.log("players exists ");
          result(null, res);
        }
      );
  }


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
