const express = require('express');
const router = express.Router();

const usersController = require("../controllers/users-controller");
// route index
router.get("/", usersController.index);

// route create
router.get("/create", usersController.create);

router.post("/create", usersController.createPost);

// route edit
router.get("/edit/:id", usersController.edit);

router.post("/edit", usersController.editPost);

// route search
router.get("/search", usersController.search);

// route delete
router.get("/delete/:id", usersController.delete);


module.exports = router;