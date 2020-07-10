const shortid = require('shortid');
const db = require("../db.js");

const mongoose = require("mongoose");
const User = require("../models/users.js");

var avatarUrl = "";

const multer  = require('multer')
const upload = multer({ dest: './public/uploads' })

const bcrypt = require('bcrypt');
const saltRounds = 10;

var cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: process.env.UPLOAD_CLOUD_NAME,
  api_key: process.env.UPLOAD_API_KEY, 
  api_secret: process.env.UPLOAD_API_SECRET
});

module.exports.index = (req, res) => {
	User.find().exec().then(docs => {
		res.render("users/index", {
		users: docs
		});
	})
}

module.exports.create = (req, res) => {
	res.render("users/create");
}

module.exports.createPost = (req, res) => {
	// req.body.id = shortid.generate();
	// req.body.avatar = req.file.path.split("/").slice(1).join("/");
	const hash = bcrypt.hashSync(req.body.password, saltRounds);
	req.body.password = hash;

	let admin = Boolean(req.body.isAdmin);
	req.body.isAdmin = admin;
	// db.get("users").push(req.body).write();

	cloudinary.uploader.upload(req.file.path, function(error, result) { 
		// db.get("users").find({id: req.body.id}).assign({avatar: result.url}).write();

		const user = new User({
			_id: new mongoose.Types.ObjectId(),
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
			avatar: result.url,
			phonenumber: req.body.number,		
			isAdmin: false
		});
		user.save().then(result => {
			console.log(result)
		})
		.catch(err => console.log(err));
	});

	res.redirect("/");
}

module.exports.edit = (req, res) => {
	let id = req.params.id;
	res.render("users/edit", {
		id: id
	});
}

module.exports.editPost = (req, res) => {	
	User.update({_id: req.body.id}, {$set: {name: req.body.name}});  
	res.redirect("/users");
}

module.exports.search = (req, res) => {
	let q = req.query.q;
	let matchedName = db.get("users").filter( (user) =>{
		return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	}).value();
	let matchedPhone = db.get("users").filter( (phone) => {
		return phone.number.indexOf(q) !== -1;
	})
	res.render("users/index.pug", {
		users: matchedName
	});
}

module.exports.delete = (req, res) => {
	let id = req.params.id;
	User.remove({_id: id}).exec();
	res.redirect("back");
}
