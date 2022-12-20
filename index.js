console.log("Server booting up");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
require(`dotenv`).config();
const app = express();

const PORT = process.env.PORT || 3001;

// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.set("view engine", "ejs");

//Mongo connection with a promise
MongoClient.connect(
  "mongodb+srv://test:unkxB7StNEh8DuXD@simplecrudtest.kbndeam.mongodb.net/?retryWrites=true&w=majority",
  { useUnifiedTopology: true }
)

  .then((client) => {
    console.log("Connected to Database");
    const db = client.db("simplecrudtest");
    const quotesCollection = db.collection("Local Lore");

    //===================
    //MiddleWares
    //================

    app.set("view engine", "ejs");
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(express.static("public"));

    // ========================
    // App handling
    // ========================
    // All your handlers here...
    app.get("/", (req, res) => {
      res.sendFile(
        "/Users/blairsm/Desktop/HTML Class/Local Lore/Local Lore- Back End" +
          "/index.html"
      );
      // Note: __dirname is the current directory you're in. Try logging it and see what you get!
      // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
    });

    app.get("/about/", (req, res) => {
      res.sendFile(
        "/Users/blairsm/Desktop/HTML Class/Local Lore/Local Lore- Back End" +
          "/about.html"
      );
    });

    app.get(`/api`, (req, res) => {
      res.json({ success: true });
    });

    // //inserts form data from food to database, then redirects to bbq page
    // //TODO logic will be similar after submission of user creation?
    // app.post("/food", (req, res) => {
    //   foodCollection
    //     .insertOne(req.body)
    //     .then((result) => {
    //       console.log(result);
    //       res.redirect("/");
    //     })
    //     .catch((error) => console.error(error));
    // });

    // ========================
    // Listen
    // ========================
    //Generates and listens to port 3000
    //TODO Should the listen be changed to the site url?
    app.listen(PORT, () => {
      console.log("listening on 3001");
    });
  })
  .catch((error) => console.error(error));
