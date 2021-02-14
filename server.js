const express = require('express');
const app = express();

// view engine ejs
//app.set('view engine', 'ejs');

// make the static/public folder public
app.use(express.static('static/public'));

// make views/pages folder public
app.use(express.static('views'));

// server listens to port 3000
app.listen(3000);

// app.mehtod('path', callbackfunction)
app.get('/', onhome);
app.get('/about', onabout);
app.get('/match', onmatch);

// errors
app.use(error404);

// callback functions
function onhome (req,res) {
    res.send('<h1>Hello Client</h1>');
}

function onabout (req,res) {
    res.send('<h1>About page</h1>');
}

function onmatch (req, res) {
    res.render('match.ejs');
}

function error404( req, res, next) {
    res.status(404).send("Sorry can't find that!");
  }
