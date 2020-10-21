-- MySQL Script generated by MySQL Workbench
-- Tue Oct 20 20:33:17 2020
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema farmers_api
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `farmers_api` ;

-- -----------------------------------------------------
-- Schema farmers_api
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `farmers_api` DEFAULT CHARACTER SET utf8mb4 ;
USE `farmers_api` ;

-- -----------------------------------------------------
-- Table `farmers_api`.`farmers`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `farmers_api`.`farmers` ;

CREATE TABLE IF NOT EXISTS `farmers_api`.`farmers` (
  `id` INT NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  `email` VARCHAR(50) NOT NULL,
  `phone` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `farmers_api`.`farms`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `farmers_api`.`farms` ;

CREATE TABLE IF NOT EXISTS `farmers_api`.`farms` (
  `id` INT NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  `address` VARCHAR(50) NOT NULL,
  `city` VARCHAR(40) NOT NULL,
  `postal_code` INT(5) NOT NULL,
  `coordinates` VARCHAR(40) NOT NULL,
  `website` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `farmers_api`.`products`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `farmers_api`.`products` ;

CREATE TABLE IF NOT EXISTS `farmers_api`.`products` (
  `id` INT NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  `type` VARCHAR(40) NOT NULL,
  `description` LONGTEXT NOT NULL,
  `season` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `farmers_api`.`rides_history`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `farmers_api`.`rides_history` ;

CREATE TABLE IF NOT EXISTS `farmers_api`.`rides_history` (
  `id` INT NOT NULL,
  `starting_coordinates` VARCHAR(40) NOT NULL,
  `destination_coordinates` VARCHAR(40) NOT NULL,
  `distance` VARCHAR(20) NOT NULL,
  `estimated_time` VARCHAR(20) NOT NULL,
  `travel_mode` VARCHAR(40) NOT NULL,
  `disability_friendly` TINYINT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `farmers_api`.`clients`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `farmers_api`.`clients` ;

CREATE TABLE IF NOT EXISTS `farmers_api`.`clients` (
  `id` INT NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  `email` VARCHAR(50) NOT NULL,
  `phone` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `farmers_api`.`farm_images`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `farmers_api`.`farm_images` ;

CREATE TABLE IF NOT EXISTS `farmers_api`.`farm_images` (
  `id` INT NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `farms_id` INT NOT NULL,
  PRIMARY KEY (`id`, `farms_id`),
  CONSTRAINT `fk_farm_images_farms1`
    FOREIGN KEY (`farms_id`)
    REFERENCES `farmers_api`.`farms` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_farm_images_farms1_idx` ON `farmers_api`.`farm_images` (`farms_id` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `farmers_api`.`farm_schedules`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `farmers_api`.`farm_schedules` ;

CREATE TABLE IF NOT EXISTS `farmers_api`.`farm_schedules` (
  `id` INT NOT NULL,
  `day` VARCHAR(10) NOT NULL,
  `start_time` TIME NOT NULL,
  `end_time` TIME NOT NULL,
  `activity` VARCHAR(40) NOT NULL,
  `farms_id` INT NOT NULL,
  PRIMARY KEY (`id`, `farms_id`),
  CONSTRAINT `fk_farm_schedules_farms1`
    FOREIGN KEY (`farms_id`)
    REFERENCES `farmers_api`.`farms` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_farm_schedules_farms1_idx` ON `farmers_api`.`farm_schedules` (`farms_id` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `farmers_api`.`farmers_contributions`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `farmers_api`.`farmers_contributions` ;

CREATE TABLE IF NOT EXISTS `farmers_api`.`farmers_contributions` (
  `id` INT NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  `email` VARCHAR(50) NULL,
  `phone` VARCHAR(20) NULL,
  `clients_id` INT NOT NULL,
  PRIMARY KEY (`id`, `clients_id`),
  CONSTRAINT `fk_farmers_contributions_clients1`
    FOREIGN KEY (`clients_id`)
    REFERENCES `farmers_api`.`clients` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_farmers_contributions_clients1_idx` ON `farmers_api`.`farmers_contributions` (`clients_id` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `farmers_api`.`farmers_has_farms`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `farmers_api`.`farmers_has_farms` ;

CREATE TABLE IF NOT EXISTS `farmers_api`.`farmers_has_farms` (
  `farmers_id` INT NOT NULL,
  `farms_id` INT NOT NULL,
  PRIMARY KEY (`farmers_id`, `farms_id`),
  CONSTRAINT `fk_farmers_has_farms_farmers1`
    FOREIGN KEY (`farmers_id`)
    REFERENCES `farmers_api`.`farmers` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_farmers_has_farms_farms1`
    FOREIGN KEY (`farms_id`)
    REFERENCES `farmers_api`.`farms` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_farmers_has_farms_farms1_idx` ON `farmers_api`.`farmers_has_farms` (`farms_id` ASC) VISIBLE;

CREATE INDEX `fk_farmers_has_farms_farmers1_idx` ON `farmers_api`.`farmers_has_farms` (`farmers_id` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `farmers_api`.`farms_has_products`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `farmers_api`.`farms_has_products` ;

CREATE TABLE IF NOT EXISTS `farmers_api`.`farms_has_products` (
  `farms_id` INT NOT NULL,
  `products_id` INT NOT NULL,
  PRIMARY KEY (`farms_id`, `products_id`),
  CONSTRAINT `fk_farms_has_products_farms1`
    FOREIGN KEY (`farms_id`)
    REFERENCES `farmers_api`.`farms` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_farms_has_products_products1`
    FOREIGN KEY (`products_id`)
    REFERENCES `farmers_api`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_farms_has_products_products1_idx` ON `farmers_api`.`farms_has_products` (`products_id` ASC) VISIBLE;

CREATE INDEX `fk_farms_has_products_farms1_idx` ON `farmers_api`.`farms_has_products` (`farms_id` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `farmers_api`.`labels`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `farmers_api`.`labels` ;

CREATE TABLE IF NOT EXISTS `farmers_api`.`labels` (
  `id` INT NOT NULL,
  `name` VARCHAR(50) NULL,
  `description` LONGTEXT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `farmers_api`.`products_has_labels`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `farmers_api`.`products_has_labels` ;

CREATE TABLE IF NOT EXISTS `farmers_api`.`products_has_labels` (
  `products_id` INT NOT NULL,
  `labels_id` INT NOT NULL,
  PRIMARY KEY (`products_id`, `labels_id`),
  CONSTRAINT `fk_products_has_labels_products1`
    FOREIGN KEY (`products_id`)
    REFERENCES `farmers_api`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_products_has_labels_labels1`
    FOREIGN KEY (`labels_id`)
    REFERENCES `farmers_api`.`labels` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_products_has_labels_labels1_idx` ON `farmers_api`.`products_has_labels` (`labels_id` ASC) VISIBLE;

CREATE INDEX `fk_products_has_labels_products1_idx` ON `farmers_api`.`products_has_labels` (`products_id` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `farmers_api`.`farms_contributions`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `farmers_api`.`farms_contributions` ;

CREATE TABLE IF NOT EXISTS `farmers_api`.`farms_contributions` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `address` VARCHAR(50) NOT NULL,
  `city` VARCHAR(40) NOT NULL,
  `postal_code` INT(5) NOT NULL,
  `clients_id` INT NOT NULL,
  PRIMARY KEY (`id`, `clients_id`),
  CONSTRAINT `fk_farms_contributions_clients1`
    FOREIGN KEY (`clients_id`)
    REFERENCES `farmers_api`.`clients` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_farms_contributions_clients1_idx` ON `farmers_api`.`farms_contributions` (`clients_id` ASC) VISIBLE;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
