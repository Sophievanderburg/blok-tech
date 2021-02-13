const express = require('express');
const app = express();

app.use(express.static('static/public'));
app.get('/', onhome);
app.get('/about', onabout);
app.listen(3000);

function onhome (req,res) {
    res.send('<h1>Hello Client</h1>');
}

function onabout (req,res) {
    res.send('<h1>About page</h1>');
}
