const express = require('express');
const router = express.Router();

const transController = require("../controllers/transactions-controller");
const countCookie = require("../cookie-middleware/cookie-check.js");

// route index
router.get("/", transController.index);

// route create
router.get("/create", transController.create);

router.post("/create", transController.createPost);


// route delete
router.get("/delete/:id", transController.delete);


router.get("/complete/:id", transController.complete);


router.post("/complete", transController.completePost);
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