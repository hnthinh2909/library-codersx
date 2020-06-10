const md5 = require('md5');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const db = require("../db.js");

let countLogin = 0;

module.exports.login =  function(req, res) {
	res.render("auth/login");
}

module.exports.loginPost = function(req, res, next) {
	let email = req.body.email;
	let password = req.body.password; 
	let hashedPwd = md5(password);
	let captcha = db.get("captcha").value();
	// console.log(captcha);

	let user = db.get("users").find({email: email}).value();

	
	// console.log(user.password);
	if(password == "") {
		res.render("auth/login", {
			errors: ["Errors: Email and Password is empty!"]
		})
	}
	// still error log on terminal if password is empty
	const hash = bcrypt.hashSync(password, saltRounds);
	const loadHash = bcrypt.compareSync(password, user.password);
	// console.log(loadHash);

	console.log(countLogin);
	if(countLogin == 5) {
		res.render("auth/validate-login", {
			errors: ["Because you login 5 times wrong. Wait 30 seconds and retry."],
			captcha
		})
		countLogin = 0;
	}
	

	if(!user) {
		countLogin++;
		res.render("auth/login", {
			errors: ["Your email is not exist!"],
			values: req.body
		})
		
		return;
	}
	
	if(!loadHash) {
		countLogin++;
		res.render("auth/login", {
			errors: ["Your password is wrong!"],
			values: req.body
		});
		
		return;
	}

	res.cookie("userId", user.id)
	res.redirect("/");
}