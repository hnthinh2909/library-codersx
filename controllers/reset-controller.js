const db = require("../db.js");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const mongoose = require("mongoose");
const Users = require("../models/users.js");

module.exports.index = function(req, res) {
	res.render("users/reset-password");
}

module.exports.indexPost = function(req, res) {
	let newPwd = req.body.password;
	const hashPwd = bcrypt.hashSync(newPwd, saltRounds);

	let email = req.body.email;
	User.updateOne({_id: id}, {$set: {password: hashPwd}}).exec();
	res.redirect("/auth/login");
}
