// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

//Routes
app.get('/all', (req, res) => {
    res.send(projectData);
})

app.post('/add', (req, res) => {
    let newData = req.body;
    projectData['temp'] = newData.temperature,
    projectData['date'] = newData.date,
    projectData['userResponse'] = newData.userResponse
    
    console.log("Data added: ")
    console.log(projectData)
    res.send({message: 'data added'})
})

// Setup Server
const port = 3000;
app.listen(port, listening);

function listening(){
    console.log("Server listening on port " + port);
}