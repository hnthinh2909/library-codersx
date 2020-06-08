const db = require("../db.js");

module.exports.login =  function(req, res) {
	res.render("auth/login");
}

module.exports.loginPost = function(req, res, next) {
	let email = req.body.email;
	let password = req.body.password; 

	let user = db.get("users").find({email: email}).value();

	if(!user) {
		res.render("auth/login", {
			errors: ["Your email is not exist!"],
			values: req.body
		})
		return;
	}

	if(password !== user.password) {
		res.render("auth/login", {
			errors: ["Your password is wrong!"],
			values: req.body
		});
		return;
	}

	res.cookie("userId", user.id)
	res.redirect("/");
}