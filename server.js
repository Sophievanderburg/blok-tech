const express = require('express');
const app = express();
const bodyParser = require('body-parser'); //parses the data and stores it in req.body

var data = [];
var matches = [
                {firstname:"Sophie", lastname:"van der Burg", age:"19", genre1:"Pop", genre2:"Pop 2", genre3:"Pop 3"},
                {firstname:"Rob", lastname:"Bakker", age:"23", genre1:"Rock", genre2:"Rock 2", genre3:"Rock 3"}, 
              ]

// view engine ejs
app.set('view engine', 'ejs');

// make the static/public folder public
app.use(express.static('static/public'));

// bodyParser iets
app.use(bodyParser.urlencoded({ extended: true}));

// app.mehtod('path', callbackfunction)
app.get('/', onsavedmatch);
app.get('/match', onmatch);
app.get('/practice', onpractice);
app.post('/practice', postname);
app.delete('/practice', deleteListitem)

// errors
app.use(error404);

// server listens to port 3000
app.listen(3000);

// callback functions
function onsavedmatch (req, res) {
    res.render('savedmatch.ejs', {matches:matches});
}

function onmatch (req, res) {
    res.render('match.ejs');
}

function onpractice (req, res) {
    res.render('practice.ejs', {name:"Sophie", age: 19, firstname:"...", animal:["dog", "cat", "frog", "mouse"]});
}

//werkt niet!!
function deleteListitem (req, res){
    res.send('Got a DELETE request at /practice')
}

function postname (req, res){
    data.push({firstname:req.body.firstname});
    res.send({firstname:"req.body.firstname"});
}

function error404( req, res, next) {
    res.status(404).send("Sorry can't find that!");
  }
