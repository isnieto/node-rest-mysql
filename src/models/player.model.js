//  Import db.connection and Mysql Queries
const mysql = require("../config/db-connection.js");
const queries = require("../config/mysql-queries.js");
//const { promise } = require("../config/db-connection.js");

//  Player class and use the database connection above to add  CRUD methods:
class Player {
  constructor(playerName) {
    this.nickName = playerName;
  }
  // Create new Player [ IN PROCESS ]
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
  }

  // Get one player by ID
  static findById(playerId) {
    return new Promise((resolve, reject) => {
      mysql.query(queries.getOnePlayer(playerId), (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  } // Ende findByID

  // Check if PlayerName already existes in database
  static checkIfPlayer(playerName) {
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
  }

  // Get all data from players
  static getAllPlayers() {
    return new Promise((resolve, reject) => {
      mysql.query(queries.getAllPlayers, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }
} // END CLass Game

// Export
module.exports = Player;
