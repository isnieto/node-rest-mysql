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
        }
      });
    }).catch(error => { console.log('caught', error.message); });;
  }

  // Check if PlayerName already existes in database
  static checkIfPlayerExists(playerName) {
    return new Promise((reject, resolve) => {
      // console.log(queries.searchByName(playerName) + "\n");
      mysql.query(queries.searchByName(playerName), (err, res, rows) => {
        // If Name no exists response is NULL
        if (err) {
          reject(res);
        } 
        if(res.length !== 0){
            console.log("Si está en DB");
            resolve(res);
          } else {
          console.log("NO está en DB");
          resolve(res, rows);}
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
