-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 21. Mrz 2020 um 19:26
-- Server-Version: 10.4.11-MariaDB
-- PHP-Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `digital_co_working`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `kategorie`
--

CREATE TABLE `kategorie` (
  `ID` int(10) NOT NULL,
  `Name` varchar(20) NOT NULL,
  `Inhalt` text NOT NULL,
  `Links` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `routine`
--

CREATE TABLE `routine` (
  `ID` int(10) NOT NULL,
  `Name` varchar(40) NOT NULL,
  `TeamID` varchar(30) NOT NULL,
  `Erstellungsdatum` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `routine`
--

INSERT INTO `routine` (`ID`, `Name`, `TeamID`, `Erstellungsdatum`) VALUES
(100000, 'Routine1', 'Team1', '2020-03-21 16:16:15'),
(100001, 'Routine2', 'Team1', '2020-03-21 16:16:15'),
(100002, 'Routine Montag', 'Team2', '2020-03-21 16:16:15'),
(100003, 'Routine Dienstag', 'Team1', '2020-03-21 16:16:15');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `team`
--

CREATE TABLE `team` (
  `Name` varchar(30) NOT NULL,
  `Erstellungsdatum` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `team`
--

INSERT INTO `team` (`Name`, `Erstellungsdatum`) VALUES
('Team1', '2020-03-21 15:08:01'),
('Team2', '2020-03-21 15:08:01'),
('Team3', '2020-03-21 17:30:03'),
('Team4', '2020-03-21 18:22:53'),
('Team5', '2020-03-21 18:22:53');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `unterpunkte`
--

CREATE TABLE `unterpunkte` (
  `ID` int(10) NOT NULL,
  `Name` varchar(20) NOT NULL,
  `Starttime` time NOT NULL,
  `Endtime` time NOT NULL,
  `KategorieID` int(10) NOT NULL,
  `Beschreibung` text NOT NULL,
  `RoutineID` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `unterpunkte`
--

INSERT INTO `unterpunkte` (`ID`, `Name`, `Starttime`, `Endtime`, `KategorieID`, `Beschreibung`, `RoutineID`) VALUES
(100000, 'Hangouts', '09:00:00', '12:00:00', 100000, 'Hier könnte ein Text stehen', 100000),
(100001, 'Pause', '12:00:00', '13:00:00', 100001, 'Jetzt ist Pause', 100000);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `user`
--

CREATE TABLE `user` (
  `ID` int(5) NOT NULL,
  `Email` varchar(30) NOT NULL,
  `Vorname` varchar(20) NOT NULL,
  `Nachname` varchar(20) NOT NULL,
  `Nutzername` varchar(20) NOT NULL,
  `Passwort` varchar(15) NOT NULL,
  `Geburtsdatum` date NOT NULL,
  `Erstellungsdatum` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `user`
--

INSERT INTO `user` (`ID`, `Email`, `Vorname`, `Nachname`, `Nutzername`, `Passwort`, `Geburtsdatum`, `Erstellungsdatum`) VALUES
(1, 'user1@test.de', 'Ulf', 'Fischer', 'ufischer', '123456', '2020-03-31', '2020-03-21 14:02:56'),
(2, 'user@test.de', 'Peter', 'Schmidt', 'pschmidt', '123456', '2020-03-01', '2020-03-21 14:02:56');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `user-team-zuordnung`
--

CREATE TABLE `user-team-zuordnung` (
  `UserID` varchar(30) NOT NULL,
  `TeamID` varchar(30) NOT NULL,
  `Erstellungsdatum` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `user-team-zuordnung`
--

INSERT INTO `user-team-zuordnung` (`UserID`, `TeamID`, `Erstellungsdatum`) VALUES
('1', 'Team1', '2020-03-21 15:13:29'),
('2', 'Team1', '2020-03-21 15:14:43'),
('1', 'Team2', '2020-03-21 15:13:29'),
('1', 'Team3', '2020-03-21 15:14:43'),
('1', 'Team4', '2020-03-21 15:14:43');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `kategorie`
--
ALTER TABLE `kategorie`
  ADD PRIMARY KEY (`ID`);

--
-- Indizes für die Tabelle `routine`
--
ALTER TABLE `routine`
  ADD PRIMARY KEY (`ID`);

--
-- Indizes für die Tabelle `team`
--
ALTER TABLE `team`
  ADD PRIMARY KEY (`Name`);

--
-- Indizes für die Tabelle `unterpunkte`
--
ALTER TABLE `unterpunkte`
  ADD PRIMARY KEY (`ID`);

--
-- Indizes für die Tabelle `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`ID`);

--
-- Indizes für die Tabelle `user-team-zuordnung`
--
ALTER TABLE `user-team-zuordnung`
  ADD PRIMARY KEY (`TeamID`,`UserID`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `kategorie`
--
ALTER TABLE `kategorie`
  MODIFY `ID` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `routine`
--
ALTER TABLE `routine`
  MODIFY `ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100005;

--
-- AUTO_INCREMENT für Tabelle `unterpunkte`
--
ALTER TABLE `unterpunkte`
  MODIFY `ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100003;

--
-- AUTO_INCREMENT für Tabelle `user`
--
ALTER TABLE `user`
  MODIFY `ID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

