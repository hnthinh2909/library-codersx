const shortid = require('shortid');
const db = require("../db.js");

module.exports.index = (req, res) => {
	let users = db.get("users").value();
	let books = db.get("books").value();
	let transactions = db.get("transactions").value();

    let changeTrans = transactions.map(trans => {
    let book = books.find(book => book.id === trans.bookId);
    let user = users.find(user => user.id === trans.userId);
    let godId = transactions.find(id => id.id === trans.id);
    return {  bookTitle: book.name, userName: user.name, id: godId.id };
  		});
	res.render("transactions/index", {
		transactions: changeTrans,
		books, users
	});
}

module.exports.create = (req, res) => {
	let users = db.get("users").value();
	let books = db.get("books").value();
	res.render("transactions/create", {
		users, books
	});
}

module.exports.createPost = (req,res) => {
	req.body.id = shortid.generate();
	db.get("transactions")
 	  .push(req.body)
 	  .write();
 	res.redirect("/transactions");
}

module.exports.delete = (req, res) => {
	let id = req.params.id;
	db.get("transactions")
	  .remove({id: id})
	  .write()
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