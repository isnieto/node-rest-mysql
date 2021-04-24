//  Import db.connection
const mysql = require("./db.js");

//  Player class and use the database connection above to add  CRUD methods:
class Game {
  constructor(playerName, date = new Date()) {
    this.nickName = playerName;
    this.registeredAt = date;
  }
}


// Get all data from players
Game.getAll = (result) => {
  mysql.query("SELECT * FROM players", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("players: ", res);
    result(null, res);
  });
};
// Get one player by ID
Game.findById = (playerId, result) => {
  mysql.query(`SELECT * FROM players WHERE player_id = ${playerId}`, (err, res) => {
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

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};


// Export
module.exports = Game;
