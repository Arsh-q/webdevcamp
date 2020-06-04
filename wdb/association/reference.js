var mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/blog_demo");

var Post = require("./models/post");
var User = require("./models/user")

Post.create({
	title: "this is a new one",
	content: "this is the best"
}, function(err, post){
	User.findOne({email: "bob@gmail.com"}, function(err, foundUser){
		if(err){
			console.log(err);
		} else {
			foundUser.posts.push(post);
			foundUser.save(function(err, data){
				if(err){
					console.log(err);
				} else {
					console.log(data);
				}
			});
		}
	});
});

// User.findOne({email: "bob@gmail.com"}).populate("posts").exec(function(err, user){
// 	if(err){
// 		console.log(err);
// 	} else {
// 		console.log(user);
// 	}
// });
