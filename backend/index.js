/*-------------TODO--------------

/teams	GET (JOIN)
/teams	POST (x)
/teams/routines	GET (x)
/teams/routines	POST (x)
/teams/routines/unterpunkt	POST (x)
/teams/routine	GET (x)


---------------------------*/

const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Where we will keep books
let books = [];

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* ----------------------------- */

// Database connection

var mysql = require("mysql");

var connection = mysql.createConnection({
    user: "worker",
    password: "worker123",
    database: "digital_co_working",
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});


/*-----------------------------*/

//Configure REST methods

// GET /teams
// Parameter: User
// Description: Empfangen aller Teams des Users
app.get('/teams', (req, res) => {
    //Getting of parameter
    var user_id = req.query.user_id;
    var result = {"teams":[]};

    /* DB Query */
    
    connection.query("SELECT team.Name FROM team INNER JOIN `user-team-zuordnung` "+
    "ON `user-team-zuordnung`.TeamID = team.Name WHERE `user-team-zuordnung`.UserID = " + user_id + ";", (err,rows) => {
        if(err) throw err;

           /*
            Result format has to be like this
            {[
                {
                    "team_name":""
                },{
                    "team_name":""
                }

            ]}
            */

        //for loop to take all result teams and put them into JSON
        
        var i;
        for (i = 0; i < rows.length; i++) {
            result.teams.push(
                {
                    "team_name":rows[i].Name
                }
            );
        }

        console.log(result);

        res.send(result);
    });
    
});

// POST /teams
// Parameter: Team-Name, User-ID
// Description: Erstellen eines Teams mit Usern

app.post('/teams', (req, res) => {
    /* 
    Body format has to be like this:
    {
        "team" : "Name des Teams",
        "users" : ["email@gmail.com", "email@gmail.com"]
    } */

    var body = req.body;
    var team_name = body.team_name;
    var users = body.users;

    connection.query("INSERT INTO `team` (`Name`, `Erstellungsdatum`)"+
    " VALUES ('" + team_name + "', NULL);", (err,rows) => {
        if(err) throw err;
    });

    var userQuery = "INSERT INTO `user-team-zuordnung` (`UserID`, `TeamID`, `Erstellungsdatum`) VALUES";

    var i;
    for (i = 0; i < users.length; i++) {
        userQuery += "('User"+ i +"', '" + team_name + "', NULL),"
    }

    userQuery = userQuery.substring(0, userQuery.length - 1);

    connection.query(userQuery, (err,rows) => {
        if(err) throw err;
        res.send('Team ' + team_name + ' wurde erstellt. Anzahl der Mitglieder : ' + users.length);;
    });


});

// GET /teams/routines
// Parameter: Team-ID
// Description: Empfangen der Routinen eines Teams
app.get('/teams/routines', (req, res) => {
    //Getting of parameter
    var team_id = req.query.team_id;
    var result = {"routines":[]};

    /* DB Query */
    connection.query('SELECT ROUTINE.ID, ROUTINE.Name FROM ROUTINE WHERE ROUTINE.TeamID = '+ team_id +' ORDER BY ROUTINE.ID', (err,rows) => {
        if(err) throw err;

        /*
            Result format has to be like this
            {[
                {
                    "routine_id":"",
                    "routine_name":""
                },{
                    "routine_id":"",
                    "routine_name":""
                }

            ]}
        */

        //for loop to take all result teams and put them into JSON
        var i;
        for (i = 0; i < rows.length; i++) {
            result.routines.push(
                {
                    "routine_id":rows[i].ID,
                    "routine_name":rows[i].Name
                }
            );
        }

        console.log(result);

        res.send(result);
    });

    

    
    
});

// POST /teams/routines
// Parameter: Team-ID, Routine-Name
// Description: Routine erzeugen (vor Unterpunkten)
app.post('/teams/routines', (req, res) => {
    /* 
    Body format has to be like this:
    {
        "team_id" : "ID des Teams",
        "routine_name" : "Name der Routine"
    } 
    */

    var body = req.body;
    var team_id = body.team_id;
    var routine_name = body.routine_name;

    /* DB Query */
    
    connection.query("INSERT INTO `routine` (`ID`, `Name`, `TeamID`) "+
    "VALUES (NULL, '" + routine_name + "', '" + team_id + "')", (err,rows) => {
        if(err) throw err;
        res.send('Routine ' + routine_name + ' wurde erstellt.');
    });


    
});

// POST /teams/routines/unterpunkt
// Parameter: Routine-ID, Unterpunkt-Name, Start_Uhrzeit, End_Uhrzeit, Inhalt_ID, Beschreibung
// Description: Hinzufügen eines Unterpunktes
app.post('/teams/routines/unterpunkt', (req, res) => {
    /* 
    Body format has to be like this:
    {
        "routine_id" : "ID der Routine",
        "unterpunkt" : "Name des Unterpunkts",
        "Start_Uhrzeit" : "HH:mm",
        "End_Uhrzeit" : "HH:mm",
        "Inhalt_ID" : "ID der Kategorie",
        "Beschreibung" : "Beschreibung des Unterpunktes"
    } */

    var body = req.body;
    var routine_id = body.routine_id;
    var unterpunkt = body.unterpunkt;
    var Start_Uhrzeit = body.Start_Uhrzeit;
    var End_Uhrzeit = body.End_Uhrzeit;
    var Inhalt_ID = body.Inhalt_ID;
    var Beschreibung = body.Beschreibung;

    var unterpunkteQuery = "INSERT INTO `unterpunkte` (`ID`, `Name`, `Starttime`, `Endtime`, `KategorieID`, `Beschreibung`, `RoutineID`) "+
    "VALUES (NULL, '" + unterpunkt + "', '" + Start_Uhrzeit + "', '"+End_Uhrzeit+"', '"+Inhalt_ID+"', '"+Beschreibung+"', '"+routine_id+"')";

    connection.query(unterpunkteQuery, (err,rows) => {
        if(err) throw err;
        res.send('Unterpunkt ' + unterpunkt + ' wurde erstellt.');
    });

    
});

// GET /teams/routine
// Parameter: Routine-ID
// Description: Empfangen der Unterpunkte einer Routine

//"Routine-ID, Unterpunkt-Name, Start_Uhrzeit, End_Uhrzeit, Inhalt_ID, Beschreibung"
app.get('/teams/routine', (req, res) => {
    //Getting of parameter
    var routine_id = req.query.routine_id;
    var result = {"unterpunkte":[]};

    /* DB Query */
    connection.query('SELECT unterpunkte.ID, unterpunkte.Name, unterpunkte.Starttime, unterpunkte.Endtime, unterpunkte.Beschreibung '+
    'FROM unterpunkte WHERE unterpunkte.RoutineID = ' + routine_id + ' ORDER BY Starttime', (err,rows) => {
        if(err) throw err;

        /*
        Result format has to be like this
        {[
            {
                "unterpunkt_id" : "ID der Routine",
                "unterpunkt" : "Name des Unterpunkts",
                "Start_Uhrzeit" : "HH:mm",
                "End_Uhrzeit" : "HH:mm",
                "Inhalt_ID" : "ID der Kategorie",
                "Beschreibung" : "Beschreibung des Unterpunktes"
            },{
                "unterpunkt_id" : "ID der Routine",
                "unterpunkt" : "Name des Unterpunkts",
                "Start_Uhrzeit" : "HH:mm",
                "End_Uhrzeit" : "HH:mm",
                "Inhalt_ID" : "ID der Kategorie",
                "Beschreibung" : "Beschreibung des Unterpunktes"
            }
        ]}
        */

        //for loop to take all result teams and put them into JSON
        var i;
        for (i = 0; i < rows.length; i++) {
            result.unterpunkte.push(
                {
                    "unterpunkt_id" : rows[i].ID,
                    "unterpunkt" : rows[i].Name,
                    "Start_Uhrzeit" : rows[i].Starttime,
                    "End_Uhrzeit" : rows[i].Endtime,
                    "Beschreibung" : rows[i].Beschreibung
                }
            );
        }

        console.log(result);

        res.send(result);
    });
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));