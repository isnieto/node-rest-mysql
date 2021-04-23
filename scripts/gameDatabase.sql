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