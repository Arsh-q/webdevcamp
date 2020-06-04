var express = require("express");
var app = express();
var request = require("request");

app.get("/", function(req,res){
	res.render("search");
});

app.set("view engine", "ejs");
app.get("/results", function(req,res){
	var query = req.query.search;
	var url = "http://www.omdbapi.com/?s=" + query + "&apikey=e2b575f2";
	request(url, function(error, response, body){
		if(!error && response.statusCode == 200){
			var data = JSON.parse(body);
			res.render("results", {data: data});
		}
	});
});


app.listen(process.env.PORT || 3000,process.env.IP, function(){
	console.log("Movie app is running");
});