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
  `won` INT NOT NULL,
  `player_id` INT NOT NULL,
  CONSTRAINT fk_players FOREIGN KEY (player_id)  
  REFERENCES players(player_id)  
  ON DELETE CASCADE  
  ON UPDATE CASCADE  
);  

INSERT INTO players (nickName, registeredAt) VALUES ( 'manolito', CURDATE()), ( 'Pepon', CURDATE()),  ( 'menganito', CURDATE()), ( 'Kevin', CURDATE()) ;
INSERT INTO games (round, result, player_id, won) VALUES ( NOW(), 5, 1, 0);
UPDATE players SET nickName = '????' WHERE player_id = '??';
DELETE FROM players/games WHERE player_id = '???';

/* results of game adding 1 or 0 depending on score*/
INSERT INTO games (round, result, player_id, won) VALUES ( NOW(), 7, 1, ( CASE WHEN result >= 6 THEN 1 ELSE 0 END));

SELECT * FROM games WHERE player_id = 1 ORDER BY round ASC; 

/*la peor jugada*/
SELECT *, min(result) FROM games;
/*la mejor jugada*/
select *, max(result) from games;
/*ranking porcetange de cada jugador */
select * from games GROUP BY player_id;
 SELECT * FROM games GROUP BY player_id ORDER BY result DESC;

/* Update Name */
 UPDATE players SET nickName = 'Canyon33' WHERE player_id= 1;
/*seleccionar jugadas y jugadores por nombre*/
 SELECT g.round, g.result, p.nickName FROM games as g, players as p WHERE g.player_id = p.player_id ;
 /*Todos los resultados mayores o iguales a 7 es decir ganadores*/
  SELECT g.round, g.result, p.nickName FROM games as g, players as p WHERE (g.player_id = p.player_id && g.result>=7) ;
 
 /* porcentaje de exitos agrupados por player*/
 SELECT player_id, count(*) AS jugadas, CONCAT( ((sum(won) * 100) / count(*)), '%')  as 'ranking' FROM games GROUP BY player_id order by ((sum(won) * 100) / count(*)) DESC;
 /* porcentaje de derrotas: peor jugador*/
  SELECT player_id, count(*) AS jugadas, CONCAT( ((sum(won) * 100) / count(*)), '%')  as 'ranking' FROM games GROUP BY player_id order by ((sum(won) * 100) / count(*)) DESC;
 + LIMIT 1
  SELECT p.nickName, count(*) AS Games, CONCAT( ROUND(((sum(g.won) * 100) / count(*)), 0), '%')  as Percentage FROM games g LEFT JOIN players p ON g.player_id=p.player_Id GROUP BY g.player_id order by ((sum(won) * 100) / count(*)) DESC;
/* porcentaje de exitos: mejor jugador*/



 /*
[in process] POST: /players: crea un jugador
PUT /players : modifica el nom del jugador
POST /players/{id}/games/: un jugador específic realitza una tirada dels daus.
[DONE] DELETE /players/{id}/games: elimina les tirades del jugador
[DONE] GET /players/: retorna el llistat de tots els jugadors del sistema amb el seu percentatge mig d’èxits
[DONE] GET /players/{id}/games: retorna el llistat de jugades per un jugador.
[DONE] GET /players/ranking: retorna el ranking mig de tots els jugadors del sistema. És a dir, el percentatge mig d’èxits.
[DONE] GET /players/ranking/loser: retorna el jugador amb pitjor percentatge d’èxit
[DONE] GET /players/ranking/winner: retorna el jugador amb pitjor percentatge d’èxit*/

