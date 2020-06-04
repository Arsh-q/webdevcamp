var express = require("express");
var app = express();

app.get("/", function(req,res){
	res.send("HI THERE!");
});
app.get("/bye", function(req,res){
	res.send("Bye");
});
app.get("/dogs", function(req,res){
	res.send("MEOW!!! nodemon is here");
});
app.get("/r/:anyname", function(req,res){
	var name = req.params.anyname;
	res.send("WELCOME TO " + name.toUpperCase() + " page");
});
app.get("/r/:anyname/comments/:id/:title", function(req,res){
	res.send("welcome to comments");
	console.log(req.params);
});
app.get("*", function(req,res){
	res.send("YOU ARE A STAR");
});
app.listen(process.env.PORT || 3000,process.env.IP, function(){
	console.log("Server has started!!");
});
