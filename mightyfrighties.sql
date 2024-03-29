-- MySQL dump 10.13  Distrib 5.6.17, for osx10.9 (x86_64)
--
-- Host: localhost    Database: mightyfrighties
-- ------------------------------------------------------
-- Server version	5.6.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `abilities`
--

DROP TABLE IF EXISTS `abilities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `abilities` (
  `ability_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `level_requirement` int(11) DEFAULT '0',
  `date_added` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_enabled` tinyint(1) DEFAULT '1',
  `damage` int(11) DEFAULT '0',
  PRIMARY KEY (`ability_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `abilities`
--

LOCK TABLES `abilities` WRITE;
/*!40000 ALTER TABLE `abilities` DISABLE KEYS */;
INSERT INTO `abilities` VALUES (1,'thunderbolt','a bolt of thunder',1,'2014-06-12 04:38:28',1,3),(2,'taser','dont tase me bro',2,'2014-06-12 04:39:07',1,5),(3,'shock','basic lightning attack',2,'2014-06-12 04:40:07',1,1),(4,'ring of fire','aoe fire damage ',7,'2014-06-12 04:42:04',1,5),(5,'fireball','basic fire attack',1,'2014-06-12 04:42:31',1,1),(6,'flamethrower','just a splash of fire',2,'2014-06-12 04:43:22',1,3),(7,'water gun','basic water attack',1,'2014-06-12 04:43:49',1,1),(8,'splash','just a splash of water',2,'2014-06-12 04:44:10',1,3),(9,'bubblebeam','laser beam of bubbles',7,'2014-06-12 04:44:45',1,5),(10,'vinewhip','basic grass attack',1,'2014-06-12 04:47:12',1,1),(11,'razorleaf','a storm of razor sharp leafs',2,'2014-06-12 04:47:58',1,3),(12,'solarbeam','a blast of solar energy',7,'2014-06-12 04:48:17',1,5);
/*!40000 ALTER TABLE `abilities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `attacks`
--

DROP TABLE IF EXISTS `attacks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `attacks` (
  `attack_id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_battle_id` int(11) DEFAULT NULL,
  `fk_player_creature_ability_id` int(11) DEFAULT '0',
  `date_performed` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`attack_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attacks`
--

LOCK TABLES `attacks` WRITE;
/*!40000 ALTER TABLE `attacks` DISABLE KEYS */;
INSERT INTO `attacks` VALUES (1,41,1,'2014-06-12 07:25:00'),(2,41,2,'2014-06-12 07:25:16'),(3,41,3,'2014-06-12 07:25:20');
/*!40000 ALTER TABLE `attacks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `battles`
--

DROP TABLE IF EXISTS `battles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `battles` (
  `battle_id` int(11) NOT NULL AUTO_INCREMENT,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` int(11) DEFAULT '0',
  `fk_home_team_id` int(11) DEFAULT NULL,
  `fk_away_team_id` int(11) DEFAULT NULL,
  `fk_winning_team_id` int(11) DEFAULT '0',
  `duration` int(11) DEFAULT '0',
  `date_completed` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`battle_id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `battles`
--

LOCK TABLES `battles` WRITE;
/*!40000 ALTER TABLE `battles` DISABLE KEYS */;
INSERT INTO `battles` VALUES (5,'2014-06-12 05:36:41',0,2,3,0,0,'0000-00-00 00:00:00'),(6,'2014-06-12 05:36:43',0,2,3,0,0,'0000-00-00 00:00:00'),(7,'2014-06-12 06:07:36',0,2,3,0,0,'0000-00-00 00:00:00'),(8,'2014-06-12 06:08:45',0,2,3,0,0,'0000-00-00 00:00:00'),(9,'2014-06-12 06:09:51',0,2,3,0,0,'0000-00-00 00:00:00'),(10,'2014-06-12 06:11:22',0,2,3,0,0,'0000-00-00 00:00:00'),(11,'2014-06-12 06:13:11',0,2,3,0,0,'0000-00-00 00:00:00'),(12,'2014-06-12 06:15:25',0,2,3,0,0,'0000-00-00 00:00:00'),(13,'2014-06-12 06:18:52',0,2,3,0,0,'0000-00-00 00:00:00'),(14,'2014-06-12 06:19:54',0,2,3,0,0,'0000-00-00 00:00:00'),(15,'2014-06-12 06:21:08',0,2,3,0,0,'0000-00-00 00:00:00'),(16,'2014-06-12 06:25:35',0,2,3,0,0,'0000-00-00 00:00:00'),(17,'2014-06-12 06:28:36',0,2,3,0,0,'0000-00-00 00:00:00'),(18,'2014-06-12 06:29:33',0,2,3,0,0,'0000-00-00 00:00:00'),(19,'2014-06-12 06:30:08',0,2,3,0,0,'0000-00-00 00:00:00'),(20,'2014-06-12 06:32:17',0,2,3,0,0,'0000-00-00 00:00:00'),(21,'2014-06-12 06:32:22',0,2,3,0,0,'0000-00-00 00:00:00'),(22,'2014-06-12 06:32:23',0,2,3,0,0,'0000-00-00 00:00:00'),(23,'2014-06-12 06:32:24',0,2,3,0,0,'0000-00-00 00:00:00'),(24,'2014-06-12 06:32:26',0,2,3,0,0,'0000-00-00 00:00:00'),(25,'2014-06-12 06:32:26',0,2,3,0,0,'0000-00-00 00:00:00'),(26,'2014-06-12 06:32:27',0,2,3,0,0,'0000-00-00 00:00:00'),(27,'2014-06-12 06:32:28',0,2,3,0,0,'0000-00-00 00:00:00'),(28,'2014-06-12 06:32:29',0,2,3,0,0,'0000-00-00 00:00:00'),(29,'2014-06-12 06:34:48',0,2,3,0,0,'0000-00-00 00:00:00'),(30,'2014-06-12 06:34:49',0,2,3,0,0,'0000-00-00 00:00:00'),(31,'2014-06-12 06:34:50',0,2,3,0,0,'0000-00-00 00:00:00'),(32,'2014-06-12 06:34:51',0,2,3,0,0,'0000-00-00 00:00:00'),(33,'2014-06-12 06:34:51',0,2,3,0,0,'0000-00-00 00:00:00'),(34,'2014-06-12 06:34:52',0,2,3,0,0,'0000-00-00 00:00:00'),(35,'2014-06-12 06:34:53',0,2,3,0,0,'0000-00-00 00:00:00'),(36,'2014-06-12 06:34:54',0,2,3,0,0,'0000-00-00 00:00:00'),(37,'2014-06-12 07:08:54',0,2,3,0,0,'0000-00-00 00:00:00'),(38,'2014-06-12 07:11:43',0,2,3,0,0,'0000-00-00 00:00:00'),(39,'2014-06-12 07:21:58',0,2,3,0,0,'0000-00-00 00:00:00'),(40,'2014-06-12 07:23:03',0,2,3,0,0,'0000-00-00 00:00:00'),(41,'2014-06-12 07:24:27',0,2,3,0,0,'0000-00-00 00:00:00');
/*!40000 ALTER TABLE `battles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `creatures`
--

DROP TABLE IF EXISTS `creatures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `creatures` (
  `creature_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`creature_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `creatures`
--

LOCK TABLES `creatures` WRITE;
/*!40000 ALTER TABLE `creatures` DISABLE KEYS */;
INSERT INTO `creatures` VALUES (1,'pikachu'),(2,'charizard'),(3,'bulbasaur'),(4,'squirtle');
/*!40000 ALTER TABLE `creatures` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `player_creature_abilities`
--

DROP TABLE IF EXISTS `player_creature_abilities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `player_creature_abilities` (
  `player_creature_ability_id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_player_creature_id` int(11) DEFAULT NULL,
  `fk_creature_ability_id` int(11) DEFAULT NULL,
  `date_added` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`player_creature_ability_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player_creature_abilities`
--

LOCK TABLES `player_creature_abilities` WRITE;
/*!40000 ALTER TABLE `player_creature_abilities` DISABLE KEYS */;
INSERT INTO `player_creature_abilities` VALUES (1,1,1,'2014-06-12 04:55:16'),(2,1,2,'2014-06-12 04:55:18'),(3,1,3,'2014-06-12 04:55:20'),(4,2,4,'2014-06-12 04:55:32'),(5,2,5,'2014-06-12 04:55:35'),(6,2,6,'2014-06-12 04:55:37'),(7,3,10,'2014-06-12 04:55:50'),(8,3,11,'2014-06-12 04:55:52'),(9,3,12,'2014-06-12 04:55:53'),(10,4,7,'2014-06-12 04:56:01'),(11,4,8,'2014-06-12 04:56:02'),(12,4,9,'2014-06-12 04:56:05');
/*!40000 ALTER TABLE `player_creature_abilities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `player_creatures`
--

DROP TABLE IF EXISTS `player_creatures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `player_creatures` (
  `player_creature_id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_player_id` int(11) DEFAULT NULL,
  `fk_creature_id` int(11) DEFAULT NULL,
  `date_added` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `health` int(11) DEFAULT '100',
  `level` int(11) DEFAULT '1',
  PRIMARY KEY (`player_creature_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player_creatures`
--

LOCK TABLES `player_creatures` WRITE;
/*!40000 ALTER TABLE `player_creatures` DISABLE KEYS */;
INSERT INTO `player_creatures` VALUES (1,9,1,'2014-06-12 04:36:12',100,1),(2,9,2,'2014-06-12 04:36:15',100,1),(3,10,3,'2014-06-12 04:36:25',100,1),(4,10,4,'2014-06-12 04:36:27',100,1);
/*!40000 ALTER TABLE `player_creatures` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `players`
--

DROP TABLE IF EXISTS `players`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `players` (
  `player_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email_address` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `last_authentication_date` datetime DEFAULT '0000-00-00 00:00:00',
  `last_client_id` varchar(255) DEFAULT NULL,
  `fk_current_player_creature_id` int(11) DEFAULT '0',
  PRIMARY KEY (`player_id`),
  UNIQUE KEY `unique_email_address` (`email_address`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `players`
--

LOCK TABLES `players` WRITE;
/*!40000 ALTER TABLE `players` DISABLE KEYS */;
INSERT INTO `players` VALUES (9,'tim','tim@tim.com','lol123','2014-06-12 00:24:14','8be3b7e0-f202-11e3-8684-6720fb57eb7e',0),(10,'bob','bob@bob.com','lol456','2014-06-12 00:24:08','8793e5c0-f202-11e3-8684-6720fb57eb7e',0);
/*!40000 ALTER TABLE `players` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team_players`
--

DROP TABLE IF EXISTS `team_players`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `team_players` (
  `team_player_id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_player_id` int(11) DEFAULT NULL,
  `fk_team_id` int(11) DEFAULT NULL,
  `date_joined` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`team_player_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team_players`
--

LOCK TABLES `team_players` WRITE;
/*!40000 ALTER TABLE `team_players` DISABLE KEYS */;
INSERT INTO `team_players` VALUES (1,9,2,'2014-06-12 03:10:07'),(2,10,2,'2014-06-12 03:10:07'),(3,9,3,'2014-06-12 03:10:46'),(4,10,3,'2014-06-12 03:10:46');
/*!40000 ALTER TABLE `team_players` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teams`
--

DROP TABLE IF EXISTS `teams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teams` (
  `team_id` int(11) NOT NULL AUTO_INCREMENT,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`team_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teams`
--

LOCK TABLES `teams` WRITE;
/*!40000 ALTER TABLE `teams` DISABLE KEYS */;
INSERT INTO `teams` VALUES (1,'2014-06-12 03:07:29'),(2,'2014-06-12 03:10:07'),(3,'2014-06-12 03:10:46');
/*!40000 ALTER TABLE `teams` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-06-12  0:27:24
