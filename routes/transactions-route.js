const express = require('express');
const router = express.Router();

const transController = require("../controllers/transactions-controller");
const countCookie = require("../cookie-middleware/cookie-check.js");

// route index
router.get("/", countCookie.checkCookie, transController.index);

// route create
router.get("/create", countCookie.checkCookie, transController.create);

router.post("/create", countCookie.checkCookie, transController.createPost);


// route delete
router.get("/delete/:id", countCookie.checkCookie, transController.delete);


router.get("/complete/:id", countCookie.checkCookie, transController.complete);


router.post("/complete", countCookie.checkCookie, transController.completePost);
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