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
        if (!err) {
          reject(err);
        } else { 
          resolve(res);
        };
      });
    });
  }

  // Check if PlayerName already existes in database
  static checkIfPlayerExists(playerName) {
    return new Promise((reject, resolve) => {
      // console.log(queries.searchByName(playerName) + "\n");
      mysql.query(queries.searchByName(playerName), (err, res) => {
        // If Name no exists response is NULL
        if (!err) {
          console.log("Player exists already");
          reject(res);
        } else {
          console.log("aqui resolve")
          resolve(res);
        }
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
