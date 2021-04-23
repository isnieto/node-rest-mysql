DROP DATABASE IF EXISTS `dicegame`;
CREATE DATABASE `dicegame` CHARACTER SET utf8mb4;
USE `dicegame`;

CREATE TABLE `gamer` (
  `gamer_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `nickName` VARCHAR(45) NOT NULL,
  `registeredAt` Date NOT NULL
  PRIMARY KEY (`gamer_ id`));

  CREATE TABLE `gamesRecord` (
  `gamesRecord_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `round` DATETIME,
  `result` INT NOT NULL,
  `gamer_id` INT NOT NULL,
  CONSTRAINT fk_gamer FOREIGN KEY (gamer_id)  
  REFERENCES gamer(gamer_id)  
  ON DELETE CASCADE  
  ON UPDATE CASCADE  
);  