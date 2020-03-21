/*-------------TODO--------------

/teams	GET (x)
/teams	POST (x)
/teams/routines	GET (x)
/teams/routines	POST (x)
/teams/routines/unterpunkt	POST (x)
/teams/routine	GET (x)

- How to receive parameter? -> ?para1=xyz&para2=abc

Parameter of functions

/teams	GET	User (x)
/teams	POST	Team-Name, User-ID ()
/teams/routines	GET	Team-ID ()
/teams/routines	POST	Team-ID, Routine-Name ()
/teams/routines/unterpunkt	POST	"Routine-ID, Unterpunkt-Name, Start_Uhrzeit, End_Uhrzeit, Inhalt_ID, Beschreibung"
/teams/routine	GET	Routine-ID


---------------------------*/

const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Where we will keep books
let books = [];

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Configure REST methods

// GET /teams
// Parameter: User
// Description: Empfangen aller Teams des Users
app.get('/teams', (req, res) => {
    //Getting of parameter
    var user = req.query.user;
    var result = {};

    /*
        DB Query
    */

    /*
    Result format has to be like this
    {[
        {
            "team_id":"",
            "team_name":""
        },{
            "team_id":"",
            "team_name":""
        }

    ]}
    */

    //for loop to take all result teams and put them into JSON

    res.send(result);
});

// POST /teams
// Parameter: Team-Name, User-ID
// Description: Erstellen eines Teams mit Usern

app.post('/teams', (req, res) => {
    /* 
    Body format has to be like this:
    {
        "team" : "Name des Teams",
        "user" : ["email@gmail.com", "email@gmail.com"]
    } */

    var body = req.body;
    var team = body.team;
    var user = body.user;

    // @Yannik -> User Loop für SQL query? Wie ist das format?

    /*
        DB Query
    */

    res.send('Team ' + team + ' wurde erstellt. Anzahl der Mitglieder : ' + user.length);
});

// GET /teams/routines
// Parameter: 
// Description: Empfangen der Routinen eines Teams
app.get('/teams/routines', (req, res) => {
    // We will be coding here
});

// POST /teams/routines
// Parameter: 
// Description: Routine vor Unterpunkten erzeugen
app.post('/teams/routines', (req, res) => {
    // We will be coding here
});

// POST /teams/routines/unterpunkt
// Parameter: 
// Description: Hinzufügen eines Unterpunktes
app.post('/teams/routines/unterpunkt', (req, res) => {
    // We will be coding here
});

// GET /teams/routine
// Parameter: 
// Description: Empfangen der Unterpunkte einer Routine
app.get('/teams/routine', (req, res) => {
    // We will be coding here
});



app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));