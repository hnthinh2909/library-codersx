const express = require('express');
const router = express.Router();
const favicon = require('serve-favicon');
const path = require('path');
const app = express();

const usersValidate = require("../validate/users-validate");
const usersController = require("../controllers/users-controller");
const countCookie = require("../cookie-middleware/cookie-check.js");
const authMiddleware = require("../auth-middleware/login.js");

// route index
router.get("/",	usersController.index);

// route create
router.get("/create",	usersController.create);

router.post("/create",	usersValidate.createPost, usersController.createPost);

// route edit
router.get("/edit/:id",	usersController.edit);

router.post("/edit",	usersController.editPost);

// route search
router.get("/search",	usersController.search);

// route delete
router.get("/delete/:id",	usersController.delete);

module.exports = router;