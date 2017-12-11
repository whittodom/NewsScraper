//Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");

var axios = require("axios");
var cheerio = require("cheerio");
var request = require("request");

// Require all models
var db = require("./models");

var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

//Set up Handlebars
app.engine("handlebars", exphbs({
    defaultLayout: "main",
}));
app.set("view engine", "handlebars");

// Middlewares
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
// mongoose.connect("mongodb://heroku_55rtpppr:istfhb64is2fd3o8dpcacm3pte@ds135966.mlab.com:35966/heroku_55rtpppr", {
// 	useMongoClient: true
// }
mongoose.connect("mongodb://localhost/newsScraper_db", {
  useMongoClient: true
});

// Show any mongoose errors
mongoose.connection.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
mongoose.connection.once("open", function() {
  console.log("Mongoose connection successful.");
});

//ROUTING

app.get("/", function (req, res) {
	db.Article.find({}, function (err, dbArticles) {
		if (err) {
			res.json(err);
		} else {
			var object = {
				articles: dbArticles
			};
			res.render("articles", object);	
		};
	});
});

app.get('/scrape', function (req, res) {
    axios.get("https://www.buzzfeed.com/").then(function(response){
		var $ = cheerio.load(response.data);

		$(".link-gray").each(function(i, element) {
		      // Save an empty result object
		      var result = {};

			// Add the text and href of every link, and save them as properties of the result object
			result.title = $(this).children("h2").text();
			result.link = $(this).attr("href");
			result.body = $(this).children("p").text();

			// Create a new Article using the `result` object built from scraping
			db.Article.create(result).then(function(dbArticles) {
			  res.send("Scrape Complete");
			}).catch(function(error){
	      		res.json(err);
	    	});				
	    });	
	});
});

app.get("/articles", function (req, res) {
	db.Article.find({}, function (err, dbArticles) {
		if (err) {
			res.json(err);
		} else {
			// console.log(dbArticles);
			res.json(dbArticles);
		};
	});	
});


//Start server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!")
})