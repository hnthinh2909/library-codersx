const shortid = require('shortid');
const db = require("../db.js");

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
	db.get("users").push(req.body).write();
	res.redirect("/users");
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
	let matchedUser = db.get("users").filter( (book) =>{
		return book.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	}).value();
	console.log(matchedUser);
	res.render("users/index.pug", {
		users: matchedUser
	});
}

module.exports.delete = (req, res) => {
	let id = req.params.id;
	db.get("users")
	  .remove({id: id})
	  .write();
	res.redirect("back");
}
