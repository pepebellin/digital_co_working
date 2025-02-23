--user erstellen

INSERT INTO `user` (`ID`, `Email`, `Vorname`, `Nachname`, `Nutzername`, `Passwort`, `Geburtsdatum`, `Erstellungsdatum`)
VALUES (NULL,'', '', '', '', '', '', NULL);

--Teams anzeigen

SELECT  team.Name FROM  team INNER JOIN `user-team-zuordnung`
ON `user-team-zuordnung`.TeamID = team.Name WHERE `user-team-zuordnung`.UserID = 1 ;


--Teams erstellen

INSERT INTO `team` (`Name`, `Erstellungsdatum`)
VALUES ('', NULL);

INSERT INTO `user-team-zuordnung` (`UserID`, `TeamID`, `Erstellungsdatum`)
VALUES ('User1', 'Team1', NULL), ('User2', 'Team1', NULL), ('User3', 'Team1', NULL) --mehrere teammitglieder hinzufügen

--Routinen anzeigen

SELECT routine.ID, routine.Name
FROM routine
WHERE routine.TeamID = Variable
ORDER BY routine.ID


--Routine erstellen

INSERT INTO `routine` (`ID`, `Name`, ,`TeamID`, `Erstellungsdatum`)
VALUES (NULL, '', '', NULL)

--Unterpunkt hinzufügen

INSERT INTO `unterpunkte` (`ID`, `Name`, `Starttime`, `Endtime`, `KategorieID`, `Beschreibung`, `RoutineID`)
VALUES (NULL, '', '00:00:00', '00:00:00', '', '', ''), (NULL, '', '00:00:00', '00:00:00', '', '', '') --mehrere Unterpunkte gleichzeitig hinzufügen


--Routine anzeigen

SELECT unterpunkte.ID, unterpunkte.Name, unterpunkte.Starttime, unterpunkte.Endtime, unterpunkte.Beschreibung
FROM unterpunkte
WHERE unterpunkte.RoutineID = Variable
ORDER BY Starttime