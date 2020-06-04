var mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);


mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
	name: String,
	age: Number,
	temperament: String
});
var Cat = mongoose.model("Cat", catSchema);
Cat.create({
	name: "Snow White",
	age: 14,
	temperament: "Nice"
}, function(err, cat){
	if(err){
		console.log("error");
		console.log(err);
	} else {
		console.log(cat);
	}
});

// var george = new Cat({
// 	name: "MS. Norris",
// 	age: 11,
// 	temperament: "Grouchy"
// });

// george.save(function(err, cat){
// 	if(err){
// 		console.log("SOMETHING WENT WRONG");
// 	} else{
// 		console.log("WE JUST SAVED A CAT TO DB");
// 		console.log(cat);
// 	}
// });
Cat.find({}, function(err, cats){
	if(err){
		console.log("Oh NO error");
		console.log(err);
	} else {
		console.log("All the cats");
		console.log(cats);
	}
});