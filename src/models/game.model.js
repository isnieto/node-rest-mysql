//  Import db.connection
const mysql = require("./db.js");

//  Player class and use the database connection above to add  CRUD methods:
class Game {
  constructor(playerName, date = new Date()) {
    this.nickName = playerName;
    this.registeredAt = date;
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
} // END CLass Game

// Get one player by ID
Game.findById = (playerId, result) => {
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
};

// Get all scores from one player
Game.getAllScoresFromPlayer = (playerId, result) => {
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
};

// Get ranking of alls players PENDING retorna el jugador amb pitjor el percentatge mig d’èxits
Game.getRanking = (result) => {
  mysql.query("SELECT * FROM games ORDER BY result DESC", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Ranking: ", res);
    result(null, res);
  });
};

// Get ranking worst player PENDING retorna el jugador amb pitjor percentatge d’èxit
Game.findLoser = (result) => {
  mysql.query("SELECT *, min(result) FROM games", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("loser: ", res);
    result(null, res);
  });
};

// Get ranking best player PENDING retorna el jugador amb millor percentatge d’èxit
Game.findWinner = (result) => {
  mysql.query("SELECT *, max(result) FROM games", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("winner: ", res);
    result(null, res);
  });
};

Game.updateById = (playerId, newName, result) => {
  mysql.query(
    `UPDATE players SET nickName = ${newName} WHERE player_id=${playerId}`,
    (err, result) => {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
    }
  );
};

// Export
module.exports = Game;
