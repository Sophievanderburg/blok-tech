require("dotenv").config();
const express = require("express");
const methodOverride = require('method-override');
const app = express();
const bodyParser = require("body-parser"); //parses the data and stores it in req.body
const mongo = require("mongodb");
const MongoClient = require("mongodb").MongoClient;
const port = process.env.PORT || 3000;

// Database set up
const uri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;
const dbCollectionName = process.env.DB_COLLECTION_NAME;

main();

function main() {
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

    // enables to override a POST-method in a form
    // Source: https://dev.to/moz5691/method-override-for-put-and-delete-in-html-3fp2
    app.use(methodOverride('_method'));

    // app.method('path', callbackfunction)
    app.get("/signin", onSignIn);
    app.post("/signin", signIn);
    app.get("/", onSavedMatch);
    app.delete("/", deleteMatch);
    app.get("/profile/:id", onProfile);
    app.delete("/profile/:id", deleteOnProfile);

    // these are for practice
    app.get("/match", onMatch);
    app.get("/practice", onPractice);
    app.post("/practice", postName);

    // errors
    app.use(error404);

    // server listens to port 3000
    app.listen(port);

    // callback functions
    function onSignIn (req, res){
      res.render("signin.ejs", {
        title:"Sign in"
      });
    }

    function signIn (req, res){
      db.collection('users').insertOne(req.body)
      .then(() => {
        res.redirect('/')
      });
    }

    function onSavedMatch(req, res) {
      db.collection('users').find().toArray()
        .then(results => {
          res.render("savedmatch.ejs", {
            data: results,
            title:"Saved matches"
          });
        });
      }

    function deleteMatch (req, res){
      console.log("DELETE1");
      db.collection('users').deleteOne({_id: mongo.ObjectId(req.body.userId)})
      .then(() => {
        res.redirect('/')
      });
    }

    function onProfile (req, res){
      db.collection('users').findOne({_id: mongo.ObjectId(req.params.id)})
      .then(results => {
        console.log(results)
        res.render("profile.ejs", {
          data: results,
          title:"Profile" 
        });
      })
    }

    function deleteOnProfile (req,res){
      console.log("DELETE_PROFILE");
      db.collection('users').deleteOne({_id: mongo.ObjectId(req.params.id)})
      .then(() => {
        res.redirect('/')
      });
    }

    function onMatch(req, res) {
      res.render("match.ejs");
    }

    function onPractice(req, res) {
      res.render("practice.ejs", {
        name: "Sophie",
        age: 19,
        firstname: "...",
        animal: ["dog", "cat", "frog", "mouse"]
      });
    }

    function postName(req, res) {
      data.push({ firstname: req.body.firstname });
      res.send({ firstname: "req.body.firstname" });
    }

    function error404(req, res, next) {
      res.status(404).send("Sorry can't find that!");
    }
});
}