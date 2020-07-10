const shortid = require('shortid');
const db = require("../db.js");

const Books = require("../models/books.js");
const mongoose = require("mongoose");


module.exports.list = function(req, res) {
	Books.find()
		.exec()
		.then(docs => 
			res.render("library/list", {
			books: docs
		}))
		.catch(err => console.log(err));
}

module.exports.create = function(req, res) {
	res.render("library/create");
};

module.exports.createPost = function(req, res) {
 	// req.body.id = shortid.generate();

 	const books = new Books({
 		_id: new mongoose.Types.ObjectId(),
 		name: req.body.name,
 		description: req.body.des
 	});
 	books.save()
	 	.then(result => console.log(result))
	 	.catch(err => console.log(err));

	// db.get("books").push(req.body).write();
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

	res.render("library/edit", {
		id: id
	});
}

module.exports.editPost = function(req, res) {
	const id = req.body.id;	
	Books.updateOne(
		{_id: id},
		{ $set: 
			{name: req.body.name}
		} , 
		(err, item) => {
		console.log(item);
	})
		.exec()
		.then(result => console.log(result))
		.catch(err => console.log(err));

	res.redirect("/library");
}

module.exports.delete = function(req, res) {
	const id = req.params.id;
	Books.remove({_id: id})
		.exec()
		.then(result => console.log(result))
		.catch(err=> console.log(err));
	res.redirect("back");
}