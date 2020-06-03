const shortid = require('shortid');
const db = require("../db.js");

module.exports.list = function(req, res) {
	res.render("library/list", {
		books: db.get("books").value()
	});
}

module.exports.create = function(req, res) {
	res.render("library/create");
};

module.exports.createPost = function(req, res) {
	req.body.id = shortid.generate();
	db.get("books")
 	  .push(req.body)
 	  .write();
 	res.redirect("/library");
}

module.exports.search = function(req, res) {
	var q = req.query.q;
	var matchedBooks = db.get("books").filter(function(book){
		return book.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	}).value();
	res.render("library/list", {
		books: matchedBooks
	})
};

module.exports.edit = function(req,res) {
	let id = req.params.id;
	// var book = db.get("books").find({id: id}).value();
	// console.log(book);
	res.render("library/edit", {
		id: id
	});
}

module.exports.editPost = function(req, res) {
	db.get('books')
	  .find({id: req.body.id})
	  .assign({ name: req.body.name})
	  .write(); 
	res.redirect("/library");
}

module.exports.delete = function(req, res) {
	let id = req.params.id;
	db.get("books")
	  .remove({id: id})
	  .write();
	res.redirect("back");
}