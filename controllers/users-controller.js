const shortid = require('shortid');
const db = require("../db.js");

const multer  = require('multer')
const upload = multer({ dest: './public/uploads' })

const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.index = (req, res) => {
	res.render("users/index", {
		users: db.get("users").value()
	});
}

module.exports.create = (req, res) => {
	res.render("users/create");
}

module.exports.createPost = (req, res) => {
	req.body.id = shortid.generate();
	req.body.avatar = req.file.path.split("/").slice(1).join("/");
	const hash = bcrypt.hashSync(req.body.password, saltRounds);
	req.body.password = hash;
	db.get("users").push(req.body).write();
	res.redirect("/");
}

module.exports.edit = (req, res) => {
	let id = req.params.id;
	res.render("users/edit", {
		id: id
	});
}

module.exports.editPost = (req, res) => {	
	db.get("users")
	  .find({id: req.body.id})
	  .assign({name: req.body.name})
	  .write()
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
	db.get("users")
	  .remove({id: id})
	  .write();
	res.redirect("back");
}
