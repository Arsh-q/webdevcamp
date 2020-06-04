var mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/blog_demo");
var postSchema = new mongoose.Schema({
	title: String,
	content: String
});
var Post = mongoose.model("Post", postSchema);


var userSchema = new mongoose.Schema({
	email: String,
	name: String,
	posts: [postSchema]
});

var User = mongoose.model("User", userSchema);



// var newUser = new User({
// 	email: "harry@gmail.com",
// 	name: "granger hermoine"
// });
// newUser.posts.push({
// 	title:"Potions calss",
// 	content:"asnasdkas"
// });
// newUser.save(function(err, user){
// 	if(err){
// 		console.log(err);
// 	} else {
// 		console.log(user);
// 	}
// });

// var newPost = new Post({
// 	title:"New Book by me",
// 	content: "Nothing"
// });

// newPost.save(function(err, post){
// 	if(err){
// 		console.log(err);
// 	} else {
// 		console.log(post);
// 	}
// });

User.findOne({name: "granger hermoine"}, function(err, user){
	if(err){
		//console.log(err);
	} else {
		user.posts.push({
	title:"Voldemort is here",
	content:"about Tom Riddle"
});
user.save(function(err, user){
	if(err){
		console.log(err);
	} else {
		console.log(user);
	}
});
		
	}
});