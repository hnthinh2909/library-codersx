const db = require("../db.js");
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.index = function(req, res) {
	res.render("users/reset-password");
}

module.exports.indexPost = function(req, res) {
	let newPwd = req.body.password;
	const hashPwd = bcrypt.hashSync(newPwd, saltRounds);

	let email = req.body.email;
	db.get("users")
	  .find({email: email})
	  .assign({password: hashPwd})
	  .write();
	res.redirect("/auth/login");
}
