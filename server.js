const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

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
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// connect to Mongo DB
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI)

// Routes

// 1. a GET route to scrape website

// 2. a GET route to retrieve all articles

// 3. a GET route for grabbing a specific article by id, populate with it's comment

// 4. a POST route to save/update an Articles associated comment




// Start the Server
app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!")
})