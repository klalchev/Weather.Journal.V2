// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies*/
const bodyParser = require('body-parser');

/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;

const server = app.listen(port, listening);
function listening(){
    // console.log(server);
    console.log(`running on localhost: ${port}`);
};

const weatherData = [];

app.get('/all', getData)

function getData(req, res){
    res.send(weatherData)
    console.log(weatherData)
}

// POST Route

app.post('/addWeather', addWeather);

function addWeather(req, res){

    newEntry = {
        city: req.body.city,
        date: req.body.date,
        temp: req.body.temp,
        description: req.body.description, // when you add a new element to the server, you have to rerun the server to show the new element
        fav: req.body.fav
    }

weatherData.push(newEntry)
res.send(weatherData)
console.log(weatherData)
}