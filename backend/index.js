/*-------------TODO--------------

/teams	GET (x)
/teams	POST (x)
/teams/routines	GET (x)
/teams/routines	POST (x)
/teams/routines/unterpunkt	POST (x)
/teams/routine	GET (x)

- How to receive parameter? -> ?para1=xyz&para2=abc

Parameter of functions

/teams	GET	User
/teams	POST	Team-Name, User-ID
/teams/routines	GET	Team-ID
/teams/routines	POST	Team-ID, Routine-Name
/teams/routines/unterpunkt	POST	"Routine-ID, Unterpunkt-Name, 
Start_Uhrzeit, End_Uhrzeit, 
Inhalt_ID, Beschreibung"
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
app.get('/teams', (req, res) => {
    //Logging of parameter
    var team = {};
    team.user = req.query.user;
    console.log(team.user);
    res.send(team);
});

// POST /teams
app.post('/teams', (req, res) => {
    // We will be coding here
    const book = req.body;

    // Output the book to the console for debugging
    console.log(book);
    books.push(book);

    res.send('Book is added to the database');
});

// GET /teams/routines
app.get('/teams/routines', (req, res) => {
    // We will be coding here
});

// POST /teams/routines
app.post('/teams/routines', (req, res) => {
    // We will be coding here
});

// POST /teams/routines/unterpunkt
app.post('/teams/routines/unterpunkt', (req, res) => {
    // We will be coding here
});

// GET /teams/routine
app.get('/teams/routine', (req, res) => {
    // We will be coding here
});



app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));