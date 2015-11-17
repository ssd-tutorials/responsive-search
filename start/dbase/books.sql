-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jan 02, 2013 at 06:01 PM
-- Server version: 5.5.25
-- PHP Version: 5.3.14

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `books`
--

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `price` decimal(6,2) NOT NULL DEFAULT '0.00',
  `category` varchar(100) DEFAULT NULL,
  `author` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `title`, `price`, `category`, `author`) VALUES
(1, 'Logo Design Now (Midi Series)', 17.49, 'Design', 'Julius Wiedemann'),
(2, 'PHP and MySQL Web Development', 17.70, 'Web Programming', 'Luke Welling'),
(3, 'Composition: From Snapshots to Great Shots', 9.00, 'Photography', 'Laurie Excell'),
(4, 'From Still to Motion: A Photographer''s Guide to Creating Video \r\nwith Your DSLR', 18.48, 'Photography and Video', 'James Ball'),
(5, 'Sams Teach Yourself HTML5 Mobile Application Development \r\nin 24 Hours', 22.94, 'Web Programming', 'Jennifer Kyrnin'),
(6, 'Customised Mobile Application Development: Using XHTML \r\nParser for Google Android Platform', 37.40, 'Web Programming', 'Kaustubh Duraphe'),
(7, 'Mobile Commerce Application Development', 55.05, 'Web Programming', 'Lei-Da Chen');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
