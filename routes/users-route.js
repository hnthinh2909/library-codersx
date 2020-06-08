const express = require('express');
const router = express.Router();
const favicon = require('serve-favicon');
const path = require('path');
const app = express();

const usersValidate = require("../validate/users-validate");
const usersController = require("../controllers/users-controller");
const countCookie = require("../cookie-middleware/cookie-check.js");

// route index
router.get("/", countCookie.checkCookie, usersController.index);

// route create
router.get("/create", countCookie.checkCookie, usersController.create);

router.post("/create", countCookie.checkCookie, usersValidate.createPost, usersController.createPost);

// route edit
router.get("/edit/:id", countCookie.checkCookie, usersController.edit);

router.post("/edit", countCookie.checkCookie, usersController.editPost);

// route search
router.get("/search", countCookie.checkCookie, usersController.search);

// route delete
router.get("/delete/:id", countCookie.checkCookie, usersController.delete);

module.exports = router;