const express = require('express');
const router = express.Router();

const libraryValidate = require("../validate/library-validate.js")
const libraryController = require("../controllers/library-controller.js");
const countCookie = require("../cookie-middleware/cookie-check.js");


// route list
router.get("/", countCookie.checkCookie, libraryController.list);

// route create
router.get("/create", countCookie.checkCookie, libraryController.create)

// route create method post
router.post("/create", countCookie.checkCookie, libraryValidate.createPost, libraryController.createPost )

// route search
router.get("/search", countCookie.checkCookie, libraryController.search)

// route edit
router.get("/edit/:id", countCookie.checkCookie, libraryController.edit)

router.post("/edit", countCookie.checkCookie, libraryController.editPost)


// route delete

router.get("/delete/:id", libraryController.delete);

// app.delete("/library/:id", function(req, res) {
// 	var id = req.params.id;
// 	console.log(id);
// 	res.render("library/list");
// })

module.exports = router;