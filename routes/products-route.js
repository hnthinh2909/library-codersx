const express = require('express');
const router = express.Router();

const multer  = require('multer');
const upload = multer({ dest: './public/productImg/' });

const productsController = require("../controllers/products-controller.js");

router.get("/", productsController.index);

router.get("/edit/:id", productsController.edit);

router.post("/edit/", upload.single('image'), productsController.editPost);

module.exports = router;