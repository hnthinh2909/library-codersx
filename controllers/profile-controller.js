const db = require("../db.js");
const shortid = require('shortid');

module.exports.index = function(req, res, next) {
	let user = db.get("users").find({id:req.signedCookies.userId}).value();
	let avatar = user.avatar;
	let name = user.name;
	let email = user.email;
	console.log(name, email);
	res.render("profile/index", {
		name, email, avatar
	});
}