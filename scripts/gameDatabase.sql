DROP DATABASE IF EXISTS `dicegame`;
CREATE DATABASE `dicegame` CHARACTER SET utf8mb4;
USE `dicegame`;

CREATE TABLE `players` (
  `player_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `nickName` VARCHAR(45) NOT NULL,
  `registeredAt` Date NOT NULL
  );

  CREATE TABLE `games` (
  `gamesRecord_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `round` DATETIME,
  `result` INT NOT NULL,
  `player_id` INT NOT NULL,
  CONSTRAINT fk_players FOREIGN KEY (player_id)  
  REFERENCES players(player_id)  
  ON DELETE CASCADE  
  ON UPDATE CASCADE  
);  

INSERT INTO players (nickName, registeredAt) VALUES ( 'manolito', CURDATE());
INSERT INTO games (round, result, player_id) VALUES ( NOW(), 5, 1);

UPDATE players SET nickName = '????' WHERE player_id = '??';

DELETE FROM players/games WHERE player_id = '???';

SELECT * FROM games WHERE player_id = 1 ORDER BY round ASC; 

/*la peor jugada*/
SELECT *, min(result) FROM games;
/*la mejor jugada*/
select *, max(result) from games;
/*ranking porcetange de cada jugador */
select * from games GROUP BY player_id;
 SELECT * FROM games GROUP BY player_id ORDER BY result DESC;

