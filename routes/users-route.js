const express = require('express');
const router = express.Router();
const favicon = require('serve-favicon');
const path = require('path');
const app = express();

const multer  = require('multer');
const upload = multer({ dest: './public/uploads/' });


const usersValidate = require("../validate/users-validate");
const usersController = require("../controllers/users-controller");
const cookieMiddleware = require("../cookie-middleware/cookie-check.js");
const authRequire = require("../auth-middleware/login.js");

// route index
router.get("/",	authRequire.requireAuth, authRequire.isAdmin, usersController.index);

// route create
router.get("/create",	usersController.create);

router.post("/create",	upload.single('avatar'), usersValidate.createPost, usersController.createPost);

// route edit
router.get("/edit/:id",	authRequire.requireAuth, authRequire.isAdmin, usersController.edit);

router.post("/edit", authRequire.requireAuth, authRequire.isAdmin, usersController.editPost);

// route search
router.get("/search", authRequire.requireAuth, authRequire.isAdmin, usersController.search);

// route delete
router.get("/delete/:id", authRequire.requireAuth, authRequire.isAdmin, usersController.delete);

module.exports = router;