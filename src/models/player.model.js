//  Import db.connection and Mysql Queries
const mysql = require("../config/db-connection.js");
const queries = require("../config/mysql-queries.js");
//const { promise } = require("../config/db-connection.js");

//  Player class and use the database connection above to add  CRUD methods:
class Player {
  constructor(playerName) {
    this.nickName = playerName;
  }

  // Check if PlayerName already existes in database
  static checkIfPlayerExists(playerName) {
    return new Promise((reject, resolve) => {
      mysql.query(queries.searchByName(playerName), (err, res) => {
        // If Name no exists response is NULL
        if (err || res.length !== 0) {
          console.log("Name is already in DB\n", res);
          reject(false);
        } else {
          console.log("NO name found in DB\n", res);
          resolve(true);
        }
      });
    });
  }

  // Create new Player [ IN PROCESS ]
  static async newPlayer(playerName) {
      mysql.query(queries.createNewPlayer(playerName), (err, res) => {
        if (err) {
          return err;
        } 
        console.log("Player name introduced\n", res);
        return res;
      });
  }
  /* // Create new Player [ IN PROCESS ]
  static newPlayer(playerName) {
    return new Promise((reject, resolve) => {
      mysql.query(queries.createNewPlayer(playerName), (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    })
  } */

  // Create new Player [ IN PROCESS ]
  static updateName(newName, playerName) {
    return new Promise((reject, resolve) => {
      mysql.query(queries.modifyName(newName, playerName), (err, res) => {
        if (!err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    }).catch((error) => {
      console.log("error", error.message);
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
