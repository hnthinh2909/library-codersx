const express = require('express');
const app = express();
const shortid = require('shortid');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync("db.json");
const db = low(adapter);
const bodyParser = require('body-parser');
const port = 3000;

// to read file from db.json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));


// to set default direct of main folder
app.set("view engine", "pug");
app.set("views", "./views");

// form to write into file db.json
db.defaults({books: []}).write();

// route index
app.get("/", function(req, res) {
	res.render("library/index");
})

// route list
app.get("/library", function(req, res) {
	res.render("library/list", {
		books: db.get("books").value()
	});
});

// route create
app.get("/library/create", function(req, res) {
	res.render("library/create");
})

// route create method post
app.post("/library/create", function(req, res) {
	req.body.id = shortid.generate();
	db.get("books")
 	  .push(req.body)
 	  .write();
 	res.redirect("/library");
})

// route search
app.get("/library/search", function(req, res) {
	var q = req.query.q;
	var matchedBooks = db.get("books").filter(function(book){
		return book.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	}).value();
	res.render("library/list", {
		books: matchedBooks
	})
})

// route edit
app.get("/library/edit/:id", function(req,res) {
	let id = req.params.id;
	// var book = db.get("books").find({id: id}).value();
	// console.log(book);
	res.render("library/edit", {
		id: id
	});
})

app.post("/library/edit", function(req, res) {
	db.get('books')
	  .find({id: req.body.id})
	  .assign({ name: req.body.name})
	  .write(); 
	res.redirect("/library");
})


// route delete

app.get("/library/delete/:id", function(req, res) {
	let id = req.params.id;
	db.get("books")
	  .remove({id: id})
	  .write();
	res.redirect("back");
})

// app.delete("/library/:id", function(req, res) {
// 	var id = req.params.id;
// 	console.log(id);
// 	res.render("library/list");
// })

// to log port we using
app.listen(port, function() {
	console.log("Server listening on port " + port)
});