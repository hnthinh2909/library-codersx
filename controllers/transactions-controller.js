const shortid = require('shortid');
const db = require("../db.js");

const mongoose = require("mongoose");
const Transactions = require("../models/transactions.js");
const Users =require("../models/users.js");
const Books = require("../models/books.js");


module.exports.index = (req, res) => {
	// let transactions = db.get("transactions").value();
	Transactions.find()
		.exec()
		.then(docs => {
			res.render("transactions/index", {
				transactions: docs
			});
		})
		.catch(err => console.log(err));
}

module.exports.create = (req, res) => {
	Users.find()
		.exec()
		.then(users => {
			Books.find()
			.exec()
			.then(books => {
				res.render("transactions/create", {
					users, books
				});
			})
			.catch(err => console.log(err));
		})
		.catch(err => console.log(err));
}

module.exports.createPost = (req,res) => {
	req.body.id = shortid.generate();
	const newTransaction = new Transactions({
		_id: new mongoose.Types.ObjectId,
		user: req.body.userId,
		book: req.body.bookId
	});
	newTransaction.save().then(result => console.log(result)).catch(err => console.log(err));
 	res.redirect("/transactions");
}

module.exports.delete = (req, res) => {
	let id = req.params.id;
	Transactions.remove({_id: id}).exec();
	res.redirect("back");
}


module.exports.complete = (req, res) => {
	let id = req.params.id;
	let data = db.get("transactions").filter((complete) => {
		return complete.id === id;
	}).value();
	// console.log(data);
	res.render("transactions/complete", {
		id: id,
		data: data
	});
}

module.exports.completePost = (req, res) => {
	let id = req.params.id;
	let test = db.get("transactions")
	  .find({id: req.body.id})
	  .assign({isComplete: req.body.complete})
	  .write()
	// console.log(test);
	res.redirect("/transactions");
}