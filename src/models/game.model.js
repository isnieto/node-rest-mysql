//  Import db.connection
const mysql = require("./db.js");

//  Player class and use the database connection above to add  CRUD methods:
class Player {
  constructor(playerName, date = new Date()) {
    this.nickName = playerName;
    this.registeredAt = date;
  }
}

Player.getAll = (result) => {
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

// Export

module.exports = Player;
