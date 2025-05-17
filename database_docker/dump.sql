/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19  Distrib 10.11.11-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: 127.0.0.1    Database: gym_buddy
-- ------------------------------------------------------
-- Server version	11.7.2-MariaDB-ubu2404

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Contacts`
--

DROP TABLE IF EXISTS `Contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Contacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `link_insta` varchar(100) DEFAULT NULL,
  `link_facebook` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `Contacts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Contacts`
--

LOCK TABLES `Contacts` WRITE;
/*!40000 ALTER TABLE `Contacts` DISABLE KEYS */;
/*!40000 ALTER TABLE `Contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Gym_users`
--

DROP TABLE IF EXISTS `Gym_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Gym_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `gym_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `gym_id` (`gym_id`,`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `Gym_users_ibfk_1` FOREIGN KEY (`gym_id`) REFERENCES `Gyms` (`id`) ON DELETE CASCADE,
  CONSTRAINT `Gym_users_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Gym_users`
--

LOCK TABLES `Gym_users` WRITE;
/*!40000 ALTER TABLE `Gym_users` DISABLE KEYS */;
INSERT INTO `Gym_users` VALUES
(3,1,4),
(5,1,5),
(1,3,1),
(4,3,4),
(2,3,5);
/*!40000 ALTER TABLE `Gym_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Gyms`
--

DROP TABLE IF EXISTS `Gyms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Gyms` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Gyms`
--

LOCK TABLES `Gyms` WRITE;
/*!40000 ALTER TABLE `Gyms` DISABLE KEYS */;
INSERT INTO `Gyms` VALUES
(1,'GymOne3','Aleea Studenților 1, Timișoara'),
(2,'Gym One 2','Bulevardul Liviu Rebreanu 126, Timișoara'),
(3,'Gym One 5','Calea Circumvalațiunii nr. 8-10, Timișoara'),
(4,'CrossFit Timișoara','Strada Pestalozzi nr. 20, Timișoara'),
(5,'Arena AquaSport','Calea Dorobanților nr. 92A, Timișoara'),
(6,'Smartfit Studio','Bulevardul Cetății nr. 97, Timișoara'),
(7,'Stay Fit Gym Giroc','Calea Timișoarei nr. 13, Giroc'),
(8,'Stay Fit Gym Moșnița','Strada Florentina, Moșnița Nouă'),
(9,'World Class Iulius Town','Strada Demetriade nr. 1, Timișoara'),
(10,'Friends Arena','Strada Lacului nr. 1, Timișoara'),
(11,'Kong Gym','Strada Simion Bărnuțiu nr. 1, Timișoara'),
(12,'Haltere Club Timișoara','Strada Amforei nr. 1, Timișoara');
/*!40000 ALTER TABLE `Gyms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Photos`
--

DROP TABLE IF EXISTS `Photos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Photos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `photo_path` varchar(60) NOT NULL,
  `uploaded_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `photo_path` (`photo_path`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `Photos_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Photos`
--

LOCK TABLES `Photos` WRITE;
/*!40000 ALTER TABLE `Photos` DISABLE KEYS */;
/*!40000 ALTER TABLE `Photos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Request`
--

DROP TABLE IF EXISTS `Request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Request` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sender` int(11) NOT NULL,
  `reciver` int(11) NOT NULL,
  `status` int(11) DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `sender` (`sender`),
  KEY `reciver` (`reciver`),
  CONSTRAINT `Request_ibfk_1` FOREIGN KEY (`sender`) REFERENCES `Users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `Request_ibfk_2` FOREIGN KEY (`reciver`) REFERENCES `Users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Request`
--

LOCK TABLES `Request` WRITE;
/*!40000 ALTER TABLE `Request` DISABLE KEYS */;
/*!40000 ALTER TABLE `Request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Roles`
--

DROP TABLE IF EXISTS `Roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Roles`
--

LOCK TABLES `Roles` WRITE;
/*!40000 ALTER TABLE `Roles` DISABLE KEYS */;
INSERT INTO `Roles` VALUES
(1,'admin'),
(2,'normal-user');
/*!40000 ALTER TABLE `Roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User_Roles`
--

DROP TABLE IF EXISTS `User_Roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `User_Roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`,`role_id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `User_Roles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `User_Roles_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `Roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User_Roles`
--

LOCK TABLES `User_Roles` WRITE;
/*!40000 ALTER TABLE `User_Roles` DISABLE KEYS */;
INSERT INTO `User_Roles` VALUES
(1,1,2),
(2,2,2),
(3,4,2),
(4,5,2);
/*!40000 ALTER TABLE `User_Roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `birth_day` date DEFAULT NULL,
  `PR_arm` int(11) DEFAULT NULL,
  `PR_bench_press` int(11) DEFAULT NULL,
  `PR_leg_press` int(11) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `gender` varchar(12) DEFAULT NULL,
  `profile_photo` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES
(1,'Catalin','Ionescu','2025-04-08',34,123,154,'cata@gmail.com','$2b$10$pz1Be/i3clvfosb8KpdbzOLjW9USlg3/xnuKSdSpM/04OJsM/vc5i','lorem ipsom the fole the gtr','male',''),
(2,'Catalin','Ionescu','2025-04-08',34,123,154,'cata123@gmail.com','$2b$10$M9ft/KvgPNbUeMUB982LTOQ.4dgmEDu4c.KLAUZV.as1C8NBEfyzy','lorem ipsom the fole the gtr','male',''),
(4,'boss','boss','2025-04-09',43423,43434,656546,'boss@gmail.com','$2b$10$EQDxc/wwK0Cj35cggB6bKOIu.Bvt3pdIImcKBKgK9W0jW57jNirk6','heii its me','male',''),
(5,'chef','chef','2025-03-31',54,56,5645,'chef123@gmail.com','$2b$10$wOUN5W9FKwqubGrGZwDmT.0LeNbX6Y4g0a.CskS9izOMnDHat8epC','fsdfdf','female','');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-18  1:04:42
