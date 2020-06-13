const db = require("../db.js");
const shortid = require('shortid');

var avatarUrl = "";

var cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: process.env.UPLOAD_CLOUD_NAME,
  api_key: process.env.UPLOAD_API_KEY, 
  api_secret: process.env.UPLOAD_API_SECRET
});


module.exports.index = function(req, res, next) {
	let user = db.get("users").find({id:req.signedCookies.userId}).value();
	let avatar = user.avatar;
	let name = user.name;
	let email = user.email;
	let phone = user.number;
	res.render("profile/index", {
		name, email, avatar, phone
	});
}

module.exports.editInfo = function(req, res, next) {
	res.render("profile/edit-info");
}

module.exports.editInfoPost = function(req, res, next) {
	db.get('users')
	  .find({id: req.signedCookies.userId})
	  .assign({ name: req.body.name, number: req.body.number})
	  .write();
	res.redirect("/profile");
}

module.exports.editAvatar = function(req, res, next) {
	res.render("profile/edit-avatar");
}

module.exports.editAvatarPost = function(req, res, next) {
	const file = req.file.path;
	cloudinary.uploader.upload(req.file.path, function(error, result) { 
		req.body.avatar= result.url; 
		db.get("users")
		.find({id: req.signedCookies.userId})
		.assign({avatar: req.body.avatar})
		.write();
	}); 
	// req.body.avatar = avatarUrl.url;
	res.redirect("/profile");
}