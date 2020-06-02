const shortid = require('shortid');

const express = require('express');
const router = express.Router();

const db = require("../db.js");

// route list
router.get("/", function(req, res) {
	res.render("library/list", {
		books: db.get("books").value()
	});
});

// route create
router.get("/create", function(req, res) {
	res.render("library/create");
})

// route create method post
router.post("/create", function(req, res) {
	req.body.id = shortid.generate();
	db.get("books")
 	  .push(req.body)
 	  .write();
 	res.redirect("/library");
})

// route search
router.get("/search", function(req, res) {
	var q = req.query.q;
	var matchedBooks = db.get("books").filter(function(book){
		return book.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	}).value();
	res.render("library/list", {
		books: matchedBooks
	})
})

// route edit
router.get("/edit/:id", function(req,res) {
	let id = req.params.id;
	// var book = db.get("books").find({id: id}).value();
	// console.log(book);
	res.render("library/edit", {
		id: id
	});
})

router.post("/edit", function(req, res) {
	db.get('books')
	  .find({id: req.body.id})
	  .assign({ name: req.body.name})
	  .write(); 
	res.redirect("/library");
})


// route delete

router.get("/delete/:id", function(req, res) {
	let id = req.params.id;
	db.get("books")
	  .remove({id: id})
	  .write();
	res.redirect("back");
});

// app.delete("/library/:id", function(req, res) {
// 	var id = req.params.id;
// 	console.log(id);
// 	res.render("library/list");
// })

module.exports = router;