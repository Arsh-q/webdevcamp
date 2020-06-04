//Comments routes
var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");

router.get("/campgrounds/:id/comments/new",  isLoggedIn ,function(req, res){
		Campground.findById(req.params.id, function(err, campground){
			if(err){
				console.log(err);
			} else {
				res.render("comments/new", {campground: campground});

			}
		});
	});
	 
router.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log(err);
				} else {
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					console.log("New comment's username will be:" + req.user.username);
					campground.comments.push(comment);
					campground.save();
					req.flash("success", "Successfully added");
					res.redirect("/campgrounds/"+campground._id);
				}
			});
		}
	});
});
router.get("/", function(req,res){
	res.render("landing");
});
//auth routes
router.get("/register", function(req, res){
	res.render("register");
});
//signup logic
router.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password ,function(err, user){
		if(err){
			req.flash("error", err.message);
			return res.render("register");
		}
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Welcome to yelpCamp" + user.username);
			res.redirect("/campgrounds");
		});
	});

});
//edit route
router.get("/campgrounds/:id/comments/:comment_id/edit", checkCommenOwnership ,function(req, res){
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err){
			res.redirect("back");
		} else {
			res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
		}
	});
});

//update route

router.put("/campgrounds/:id/comments/:comment_id", checkCommenOwnership ,function(req, res){
	
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if(err){
			res.redirect("back");
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});
//destroy route
router.delete("/campgrounds/:id/comments/:comment_id", checkCommenOwnership ,function(req, res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			res.redirect("back");
		} else {
			req.flash("success", "Successfully deleted");
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

function checkCommenOwnership(req, res, next){
		if(req.isAuthenticated()){
			Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err){
			res.redirect("back");
		} else {
			if(foundComment.author.id.equals(req.user._id)){
                  next();
			} else {
				req.flash("error", "You do not have the permission to do that");
				res.redirect("back");
			}
		}
	});
	} else {
		req.flash("error", "You have to be logged in to do that");
		res.redirect("back");
	}
}

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "You need to be logged in to do that");
	res.redirect("/login");
}

module.exports = router;