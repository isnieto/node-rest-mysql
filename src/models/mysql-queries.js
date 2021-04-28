module.exports = {
  getAllPlayers: `SELECT * FROM players`,
  getOnePlayer: (playerId) => {
    return `SELECT * FROM players WHERE player_id = ${playerId}`;
  },

  getScorePlayer: (playerId) => {
    return `SELECT * FROM games WHERE player_id= ${playerId} ORDER BY round ASC`;
  },

  getRankigAll:
    "SELECT p.nickName, count(*) AS Games, CONCAT( ROUND(((sum(g.won) * 100) / count(*)), 0), '%')" +
    " AS Percentage FROM games g LEFT JOIN players p ON g.player_id=p.player_Id GROUP BY g.player_id order by ((sum(won) * 100) / count(*)) DESC;",

  getWortRanking:
    "SELECT p.nickName, count(*) AS Games, CONCAT( ROUND(((sum(g.won) * 100) / count(*)), 0), '%')  as Percentage FROM games g LEFT JOIN players p " +
    "ON g.player_id=p.player_Id GROUP BY g.player_id order by ((sum(won) * 100) / count(*)) ASC LIMIT 1;",

  getBestRanking:
    "SELECT p.nickName, count(*) AS Games, CONCAT( ROUND(((sum(g.won) * 100) / count(*)), 0), '%')  as Percentage FROM games g LEFT JOIN players p " +
    "ON g.player_id=p.player_Id GROUP BY g.player_id order by ((sum(won) * 100) / count(*)) DESC LIMIT 1;",

  deleteGamesPlayer: (playerId) => {
    return `DELETE FROM games WHERE player_id=${playerId}`;
  },
};
