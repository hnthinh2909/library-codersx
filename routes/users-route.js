const shortid = require('shortid');

const express = require('express');
const router = express.Router();

const db = require("../db.js");

// route index
router.get("/", (req, res) => {
	res.render("users/index", {
		users: db.get("users").value()
	});
})

// route create
router.get("/create", (req, res) => {
	res.render("users/create");
})

router.post("/create", (req, res) => {
	req.body.id = shortid.generate();
	db.get("users").push(req.body).write();
	res.redirect("/users");
})

// route edit
router.get("/edit/:id", (req, res) => {
	let id = req.params.id;
	res.render("users/edit", {
		id: id
	});
})

router.post("/edit", (req, res) => {	
	db.get("users")
	  .find({id: req.body.id})
	  .assign({name: req.body.name})
	  .write()
	res.redirect("/users");
})

// route search
router.get("/search", (req, res) => {
	let q = req.query.q;
	let matchedUser = db.get("users").filter( (book) =>{
		return book.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	}).value();
	console.log(matchedUser);
	res.render("users/index.pug", {
		users: matchedUser
	});
})

// route delete
router.get("/delete/:id", (req, res) => {
	let id = req.params.id;
	db.get("users")
	  .remove({id: id})
	  .write();
	res.redirect("back");
})


module.exports = router;