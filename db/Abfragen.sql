--user erstellen

INSERT INTO `user` (`Email`, `Vorname`, `Nachname`, `Nutzername`, `Passwort`, `Geburtsdatum`, `Erstellungsdatum`)
VALUES ('', '', '', '', '', '', current_timesstamp());

--Teams anzeigen

SELECT team.ID, team.Name
FROM `user`, team, `user-team-zuordnung`
WHERE `user`.Email = `user-team-zuordnung`.UserID
ORDER BY team.ID

--Teams erstellen

INSERT INTO `team` (`ID`, `Name`, `Erstellungsdatum`)
VALUES ('NULL', '', current_timesstamp());

INSERT INTO `user-team-zuordnung` (`UserID`, `TeamID`, `Erstellungsdatum`)
VALUES ('User1', 'Team1', current_timesstamp()), ('User2', 'Team1', current_timesstamp()), ('User3', 'Team1', current_timesstamp()) --mehrere teammitglieder hinzufügen

--Routinen anzeigen

SELECT routine.ID, routine.Name
FROM routine
WHERE routine.TeamID = Variable
ORDER BY routine.ID


--Routine erstellen

INSERT INTO `routine` (`ID`, `Name`, ,TeamID, `Erstellungsdatum`)
VALUES ('NULL', '', '', current_timesstamp())

--Unterpunkt hinzufügen

INSERT INTO `unterpunkte` (`ID`, `Name`, `Starttime`, `Endtime`, `KategorieID`, `Beschreibung`, `RoutineID`)
VALUES ('NULL', '', '00:00:00', '00:00:00', '', '', ''), ('NULL', '', '00:00:00', '00:00:00', '', '', '') --mehrere Unterpunkte gleichzeitig hinzufügen


--Routine anzeigen

SELECT unterpunkte.ID, unterpunkte.Name, unterpunkte.Starttime, unterpunkte.Endtime, unterpunkte.Beschreibung
FROM unterpunkte
WHERE unterpunkte.RoutineID = Variable
ORDER BY Starttime