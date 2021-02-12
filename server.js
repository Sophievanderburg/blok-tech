const express = require('express');

express()
    .get('/', sayhello)
    .listen(3000)

function sayhello (req,res) {
    res.send('<h1>Hello Client</h1>')
}
