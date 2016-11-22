/**
 * server.js
 * Main entry point for our Node.js web server. 
 * Node.js allows us to run JavaScript at the 
 * command line, and one of the things it lets us
 * do is listen for HTTP requests on a port, and
 * respond to them. This enables us to create a web
 * server.
 */

//TODO: use the "express" module to create a web server
//see http://expressjs.com/
var express = require("express"); // If passed string doesn't have ./ node will look in the modules
var Yelp = require("yelp");

var app = express();
var yelp = new Yelp({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    token: process.env.TOKEN,
    token_secret: process.env.TOKEN_SECRET
});

app.use(express.static("./static"));

//TODO: add an API route that uses the "yelp" module to 
//search for businesses using the Yelp API. See
//https://github.com/olalonde/node-yelp
app.get("/api/v1/search", function(req, res, next){
    var params = {
        term: "bars",
        ll: req.query.lat + "," + req.query.lng // gets query params from the url
    };
    yelp.search(params) // does a  search on yelp api and returns js object of data as promise
        .then(function(data){
            res.json(data); // stringifys data and writes it back to client
        })
        .catch(function(err){
            console.error(err);
            res.status(500).json(err); // sends back error status and error json
        });
});

app.listen(3000, function(){
    console.log("server is listening on http://localhost:3000")
});