const db = require("../db.js");
const shortid = require('shortid');

const mongoose = require("mongoose");
const Users = require("../models/users.js");

const bcrypt = require('bcrypt');
const saltRounds = 10;

var avatarUrl = "";

var cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: process.env.UPLOAD_CLOUD_NAME,
  api_key: process.env.UPLOAD_API_KEY, 
  api_secret: process.env.UPLOAD_API_SECRET
});


module.exports.index = function(req, res) {
	// let user = db.get("users").find({id:req.signedCookies.userId}).value();
	let data = Users.find({_id:req.signedCookies.userId}).exec().then(docs => {
		let avatar = docs[0].avatar;
		let name = docs[0].name;
		let email = docs[0].email;
		let phone = docs[0].phonenumber;
		res.render("profile/index", {
			name, email, avatar, phone
		});
	}).catch(err => console.log(err));
}

module.exports.editInfo = function(req, res, next) {
	res.render("profile/edit-info");
}

module.exports.editInfoPost = function(req, res, next) {
	Users.updateOne({_id: req.signedCookies.userId}, {$set: {name: req.body.name}})
		 .exec();
	res.redirect("/profile");
}

module.exports.editAvatar = function(req, res, next) {
	res.render("profile/edit-avatar");
}

module.exports.editAvatarPost = function(req, res, next) {
	const file = req.file.path;
	cloudinary.uploader.upload(req.file.path, function(error, result) { 
		req.body.avatar= result.url; 
		Users.updateOne({_id: req.signedCookies.userId}, {$set: {avatar: req.body.avatar}})
			 .exec().then(result => console.log(result)).catch(err => console.log(err));
	}); 
	res.redirect("/profile");
}

module.exports.changePassword = function(req, res, next) {
	res.render("profile/change-password");
}

module.exports.changePasswordPost = function(req, res, next) {
	let oldPwd = req.body.oldpassword;
	let newPwd = req.body.newpassword;

	Users.find({_id: req.signedCookies.userId}).exec().then(docs => {

		const hashOldPwd = bcrypt.hashSync(oldPwd, saltRounds);
		const checkOldPwd = bcrypt.compareSync(oldPwd, docs[0].password);
		
		if(checkOldPwd == false) {
			res.render("profile/change-password", {
				errors: ["Your current password is incorrect!"]
			})
			return;
		}
		const hashNewPwd = bcrypt.hashSync(newPwd, saltRounds);

		Users.updateOne({_id: req.signedCookies.userId}, {$set: {password: hashNewPwd}}).exec();
		res.redirect("/profile");
	})
}