const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// view engine ejs
app.set('view engine', 'ejs');

// make the static/public folder public
app.use(express.static('static/public'));

// app.mehtod('path', callbackfunction)

app.get('/', onsavedmatch);
app.get('/match', onmatch);
app.get('/practice', onpractice);

// errors
app.use(error404);

// server listens to port 3000
app.listen(3000);

// callback functions
function onsavedmatch (req, res) {
    res.render('savedmatch.ejs');
}

function onmatch (req, res) {
    res.render('match.ejs');
}

function onpractice (req, res) {
    res.render('practice.ejs', {name: 'Sophie', age: 19});
}

function error404( req, res, next) {
    res.status(404).send("Sorry can't find that!");
  }
