require("dotenv").config()
const express = require("express");
const app = express();
const bodyParser = require("body-parser"); //parses the data and stores it in req.body
const mongo = require("mongodb");
const MongoClient = require("mongodb").MongoClient;

// Database set up
//const db = require("./database/db.js")
const uri = process.env.MONGO_URI
// name of database in Atlas
const dbName = process.env.DB_NAME;
// Name of collection in Atlas
const dbCollectionName = process.env.DB_COLLECTION_NAME;

let data = [] 


main ();

function main () {
  MongoClient
    .connect(uri , {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    
    .then(connection => {
      const db = connection.db(dbName)
      console.log("connectie is gemaakt!");

    // view engine ejs
    app.set("view engine", "ejs");

    // make the static/public folder public
    app.use(express.static("static/public"));

    // bodyParser zorgt ervoor dat inpunt in req.body komen te staan
    app.use(bodyParser.urlencoded({ extended: true }));

    // app.mehtod('path', callbackfunction)
    app.get("/", onsavedmatch);
    app.delete("/", deleteMatch);
    app.get("/profile/:id", onprofile);
    app.get("/match", onmatch);
    app.get("/practice", onpractice);
    app.post("/practice", postname);

    // errors
    app.use(error404);

    // server listens to port 3000
    app.listen(3000);

    // callback functions
    function onsavedmatch(req, res) {
      db.collection('users').find().toArray()
        .then(results => {
          res.render("savedmatch.ejs",
          {data: results});
        })
    }

    function deleteMatch (){
      console.log("DELETE")
    }


    function onprofile (req, res){
      db.collection('users').findOne({_id: mongo.ObjectId(req.params.id)})
      .then(results => {
        res.render("profile.ejs",{
          data: results, 
        });
      })
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

    function postname(req, res) {
      data.push({ firstname: req.body.firstname });
      res.send({ firstname: "req.body.firstname" });
    }

    function error404(req, res, next) {
      res.status(404).send("Sorry can't find that!");
    }
});
}