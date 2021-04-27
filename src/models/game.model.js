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
    let querySQL =
      " SELECT p.nickName, count(*) AS Games, CONCAT( ROUND(((sum(g.won) * 100) / count(*)), 0), '%')  as Percentage FROM games g LEFT JOIN players p ON g.player_id=p.player_Id GROUP BY g.player_id order by ((sum(won) * 100) / count(*)) DESC;";
    mysql.query(querySQL, (err, res) => {
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
    let querySQL =
      "SELECT p.nickName, count(*) AS Games, CONCAT( ROUND(((sum(g.won) * 100) / count(*)), 0), '%')  as Percentage FROM games g LEFT JOIN players p ON g.player_id=p.player_Id GROUP BY g.player_id order by ((sum(won) * 100) / count(*)) ASC LIMIT 1;";
    mysql.query(querySQL, (err, res) => {
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
    let querySQL =
      "SELECT p.nickName, count(*) AS Games, CONCAT( ROUND(((sum(g.won) * 100) / count(*)), 0), '%')  as Percentage FROM games g LEFT JOIN players p ON g.player_id=p.player_Id GROUP BY g.player_id order by ((sum(won) * 100) / count(*)) DESC LIMIT 1;";
    mysql.query(querySQL, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("winner: ", res);
      result(null, res);
    });
  }

  // Delete all games of one player
  static deleteGames(playerId, result) {
    let querySQL = `DELETE FROM games WHERE player_id=${playerId}`;
    mysql.query(querySQL,  (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("Done: ", res);
      result(null, res);
    })
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
