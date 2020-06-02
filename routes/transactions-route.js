const shortid = require('shortid');

const express = require('express');
const router = express.Router();

const db = require("../db.js");

// route index
router.get("/", (req, res) => {
	let users = db.get("users").value();
	let books = db.get("books").value();
	let transactions = db.get("transactions").value();

    let changeTrans = transactions.map(trans => {
    let book = books.find(book => book.id === trans.bookId);
    let user = users.find(user => user.id === trans.userId);
    let godId = transactions.find(id => id.id === trans.id);
    // console.log(book);
    return {  bookTitle: book.name, userName: user.name, id: godId.id};
  		});
	res.render("transactions/index", {
		transactions: changeTrans,
		books, users
	});
})

// route create
router.get("/create", (req, res) => {
	let users = db.get("users").value();
	let books = db.get("books").value();
	res.render("transactions/create", {
		users, books
	});
})

router.post("/create", (req,res) => {
	req.body.id = shortid.generate();
	db.get("transactions")
 	  .push(req.body)
 	  .write();
 	res.redirect("/transactions");
})


// route delete
router.get("/delete/:id", (req, res) => {
	let id = req.params.id;
	db.get("transactions")
	  .remove({id: id})
	  .write()
	res.redirect("back");
})


// route search
// router.get("/search", (req, res) => {
// 	let q = req.query.q;
// 	let matchedSearch = db.get("books").filter((book) => {
// 		return book.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
// 	}).value()

// 	let users = db.get("users").value();
// 	let books = db.get("books").value();
// 	let transactions = db.get("transactions").value();

//     let changeTrans = transactions.map(trans => {
//     let book = books.find(book => book.id === trans.bookId);
//     let user = users.find(user => user.id === trans.userId);
//     let godId = transactions.find(id => id.id === trans.id);

//     return {  bookTitle: book.name, userName: user.name, id: godId.id};
//   		});
// 	res.render("transactions/index", {
// 		transactions: changeTrans,
// 		books, users
// 	});

// })


// route edit


module.exports = router;