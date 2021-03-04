require("dotenv").config()
const express = require("express");
const app = express();
const bodyParser = require("body-parser"); //parses the data and stores it in req.body
const mongo = require("mongodb");

var db = null;

mongo.MongoClient.connect(process.env.MONGO_URI, function (err, client) { 
  if (err) throw err 
  db = client.db(process.env.DB_NAME) 
})

var matches = [
  {
    firstname: "Hannah",
    lastname: "Rosenberg",
    age: "20",
    source: "images/profile/1.jpg",
    genre1: "Pop",
    genre2: "Electronic",
    genre3: "Rock",
  },
  {
    firstname: "Rob",
    lastname: "Bakker",
    age: "23",
    source: "images/profile/2.jpg",
    genre1: "Rock",
    genre2: "Pop",
    genre3: "Electronic",
  },

  {
    firstname: "Mark",
    lastname: "de Graaf",
    age: "26",
    source: "images/profile/3.jpg",
    genre1: "Electronic",
    genre2: "Rock",
    genre3: "Pop",
  },
];

// view engine ejs
app.set("view engine", "ejs");

// make the static/public folder public
app.use(express.static("static/public"));

// bodyParser zorgt ervoor dat inpunt in req.body komen te staan
app.use(bodyParser.urlencoded({ extended: true }));

// app.mehtod('path', callbackfunction)
app.get("/", onsavedmatch);
app.get("/match", onmatch);
app.get("/practice", onpractice);
app.post("/practice", postname);
app.delete("/practice", deleteListitem);

// errors
app.use(error404);

// server listens to port 3000
app.listen(3000);

// callback functions
function onsavedmatch(req, res) {
  db.collection('users').find().toArray(done)

    function done(err, data) {
    if (err) {
    next(err)
    } else {
      res.render("savedmatch.ejs", { data: data });
    } 
    console.log(data);
  } 
}

function onmatch(req, res) {
  res.render("match.ejs");
}

function onpractice(req, res) {
  res.render("practice.ejs", {
    name: "Sophie",
    age: 19,
    firstname: "...",
    animal: ["dog", "cat", "frog", "mouse"],
  });
}

//werkt niet!!
function deleteListitem(req, res) {
  res.send("Got a DELETE request at /practice");
}

function postname(req, res) {
  data.push({ firstname: req.body.firstname });
  res.send({ firstname: "req.body.firstname" });
}

function error404(req, res, next) {
  res.status(404).send("Sorry can't find that!");
}