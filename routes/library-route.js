const express = require('express');
const router = express.Router();

const libraryController = require("../controllers/library-controller.js");

// route list
router.get("/", libraryController.list);

// route create
router.get("/create", libraryController.create)

// route create method post
router.post("/create", libraryController.createPost )

// route search
router.get("/search", libraryController.search)

// route edit
router.get("/edit/:id", libraryController.edit)

router.post("/edit", libraryController.editPost)


// route delete

router.get("/delete/:id", libraryController.delete);

// app.delete("/library/:id", function(req, res) {
// 	var id = req.params.id;
// 	console.log(id);
// 	res.render("library/list");
// })

module.exports = router;