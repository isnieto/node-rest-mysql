//  Import db.connection and Mysql Queries
const mysql = require("../config/db-connection.js");
const queries = require("../config/mysql-queries.js");

//  Player class and use the database connection above to add  CRUD methods:
class Player {
  constructor(playerName) {
    this.nickName = playerName;
  }

  // Check if PlayerName already exists in database
  static checkIfPlayerExists(playerName) {
    return new Promise((reject, resolve) => {
      mysql.query(queries.searchByName(playerName), (err, res) => {
        // If Name no exists response is false
        if (err || res.length !== 0) {
          reject(false);
        } else {
          resolve(true);
        }
      });
    });
  }

  // Check if playerID is right and in database
  static checkIfIdExists(playerid) {
    return new Promise((reject, resolve) => {
      console.log(queries.searchId(playerid));
      mysql.query(queries.searchId(playerid), (err, res) => {
        // If playerId no exists response is false
        if (err) {
          reject(err);
        }
        if (res.length !== 0) {
          resolve(true);
        } else {
          resolve(false);
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
      return res;
    });
  }

  // Modify Name of a player
  static updateName(playerId, newName) {
    return new Promise((reject, resolve) => {
      mysql.query(queries.modifyPlayerName(playerId, newName), (err, res) => {
        if (err) {
          reject(err);
        } else if (res.affectedRows === 1) {
          resolve(true);
        } else {
          resolve(false);
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
