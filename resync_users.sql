-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 26, 2020 at 05:51 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `resync_users`
--

-- --------------------------------------------------------

--
-- Table structure for table `organisations`
--

CREATE TABLE `organisations` (
  `id` int(11) NOT NULL,
  `organisation_name` varchar(45) NOT NULL,
  `owner` varchar(45) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `submission_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `organisations`
--

INSERT INTO `organisations` (`id`, `organisation_name`, `owner`, `address`, `city`, `state`, `country`, `submission_date`) VALUES
(1, 'testatest', 'wes', NULL, 'Encamp', 'Encamp', 'Andorra', '2019-01-20 05:00:00'),
(2, 'org 2', 'wes', 'na', 'Ainaro', 'Ainaro', 'East Timor', '2020-02-20 05:00:00'),
(11, 'add from web', 'anyowner', NULL, NULL, NULL, NULL, '2020-03-20 05:00:00'),
(12, 'new org', 'me', NULL, NULL, NULL, NULL, '2020-04-20 05:00:00'),
(14, 'org with add', 'asdfas', NULL, NULL, NULL, NULL, '2020-05-20 05:00:00'),
(25, 'orgwadd', 'testet', 'asdfas', NULL, NULL, NULL, '2020-06-20 05:00:00'),
(26, 'allDeets', 'asdf', 'asaer', 'Rijan', 'Adrar', 'Algeria', '2020-06-20 05:00:00'),
(27, '12ewd', 'as', NULL, NULL, NULL, NULL, '2020-07-20 05:00:00'),
(35, 'alinfo', 'asdfa', 'asdff', 'Brisbane', 'Queensland', 'Australia', '2020-07-20 05:00:00'),
(36, 'bb', 'gaa', 'alala', 'Melbourne', 'Melbourne', 'Australia', '2020-07-20 05:00:00'),
(38, 'bestorg', 'bestowner', 'gad', NULL, 'Bourkou-Ennedi-Tibesti', 'Chad', '2020-09-20 05:00:00'),
(39, 'newasdf', 'asdf', 'zv', NULL, 'Swains Island', 'American Samoa', '2020-09-25 10:43:58');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `password`, `created_at`) VALUES
(1, 'test', 'testLast', 'test@test.com', '$2a$08$m6zBEAkmXaAwMumdUeHEuuxTrMEY6jHi3J87NqiDmHuDFD7kvXCDq', '2020-09-19 07:18:42');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `organisations`
--
ALTER TABLE `organisations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `organisation_name_UNIQUE` (`organisation_name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `organisations`
--
ALTER TABLE `organisations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
