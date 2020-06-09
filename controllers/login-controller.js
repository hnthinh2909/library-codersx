const md5 = require('md5');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const db = require("../db.js");

module.exports.login =  function(req, res) {
	res.render("auth/login");
}

module.exports.loginPost = function(req, res, next) {
	let email = req.body.email;
	let password = req.body.password; 
	let hashedPwd = md5(password);


	// const myPlaintextPassword = 's0/\/\P4$$w0rD';
	// const someOtherPlaintextPassword = 'not_bacon';
	// const hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
	// const loadHash = bcrypt.compareSync(myPlaintextPassword, hash);
	// console.log(hash);
	// console.log(loadHash);


	let user = db.get("users").find({email: email}).value();
	if(!user) {
		res.render("auth/login", {
			errors: ["Your email is not exist!"],
			values: req.body
		})
		return;
	}

	if(hashedPwd !== user.password) {
		res.render("auth/login", {
			errors: ["Your password is wrong!"],
			values: req.body
		});
		return;
	}

	res.cookie("userId", user.id)
	res.redirect("/");
}