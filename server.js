const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

// Scraping tools
const axios = require("axios");
const cheerio = require("cheerio");

// require all models
const db = require("./models");

const PORT = 3000;
// Initialize express
const app = express();

// Configure Middleware
// use morgan logger for logging requests
app.use(logger("dev"));
// parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// make a public static folder
app.use(express.static("public"));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// connect to Mongo DB
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Routes
//  a GET to display main page
app.get("/", function (req, res) {
  res.render("index")
})

//  a GET route to scrape website
app.get("/scrape", function (req, res) {
  axios.get("https://slashdot.org/").then(function (response) {
    console.log(response.data);
    var $ = cheerio.load(response.data);
    var articleTitles = [];

    // Now, we grab every h2 within an article tag, and do the following:
    $("article").each(function(i, element) {
      // Save an empty result object
      var result = {};
      // Add the scraped info wanted, and save them as properties of the result object
      result.title = $(this)
      .find("h2 a")
      .text();
      result.link = $(this)
      .find("h2 a")
      .attr("href");
      result.summary = $(this)
      .find(".body i")
      .text();


      console.log("result: " + JSON.stringify(result));
      // Create a new Article using the `result` object built from scraping
      db.Article.create(result)
      .then(function(dbArticle) {
        // View the added result in the console
        console.log(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, log it
        console.log(err);
      });
  });

  // Send a message to the client
    res.render("index", { article: dbArticle });

  });
})
//  a GET route to retrieve all articles
app.get("/articles", function(req, res) {
  // If all Articles are successfully found, send them back to the client
  db.Article.find({})
  .then(function(data) {
    res.json(data);
  })
  .catch(function(err) {
    // If an error occurs, send the error back to the client
    res.json(err);
  });
})
//  a GET route for grabbing a specific article by id, populate with it's comment
app.get("/articles/:id", function(req, res) {
  db.Article.findOne({_id:req.params.id})
  .populate("comment")
  .then(function(data) {
    res.json(data);
  })
  .catch(function(err) {
    res.json(err);
  })
})
//  a POST route to save/update an Articles associated comment
app.post("/articles/:id", function(req, res) {
  db.Comment.create(req.body)
  .then(function(data) {
    return db.Article.findOneAndUpdate({
      _id: req.params.id
    },
    {
      comment: dbComment._id
    },
    {
      new: true
    });
  })
  .then(function(data) {
    res.json(data);
  })
  .catch(function(err) {
    res.json(err);
  });
});



// Start the Server
app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!")
})