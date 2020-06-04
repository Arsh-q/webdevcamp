var express = require("express");
var app = express();

app.get("/", function(req,res){
	res.send("Hi there, welcome to my assingment!");
});

app.get("/speak/:animal", function(req,res){
	
	var animal = req.params.animal;
	var names = {
		pig:'oink',
		cow:'moo',
		dog:'bark'
	};
	var voice = names[animal];
	res.send("The "+ animal +" says '"+ voice + "'");
	
});

app.get("/repeat/:string/:number", function(req,res){
	var string = req.params.string;
	var num = req.params.number;
	var sen="";
	for(var i=0;i< num ; i++){
		sen = sen + string + " ";
	}
	res.send(sen);
});
app.get("*", function(req,res){
	res.send("Sorry, page not found...What are you doing with your life?");
});
app.listen(process.env.PORT || 3000,process.env.IP, function(){
	console.log("Server has started");
});