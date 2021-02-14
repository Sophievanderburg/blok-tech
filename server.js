const express = require('express');
const app = express();

app.use(express.static('static/public'));
app.get('/', onhome);
app.get('/about', onabout);
app.listen(3000);
app.use(error404)

function onhome (req,res) {
    res.send('<h1>Hello Client</h1>');
}

function onabout (req,res) {
    res.send('<h1>About page</h1>');
}

function error404( req, res, next) {
    res.status(404).send("Sorry can't find that!");
  }
