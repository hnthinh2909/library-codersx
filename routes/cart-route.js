const express = require('express');
const router = express.Router();

const cartController = require("../controllers/cart-controller.js");
const authRequire = require("../auth-middleware/login");

router.get("/", cartController.index);

router.post("/", authRequire.requireAuth, cartController.indexPost);

router.get("/add/:productId", cartController.addToCart);



module.exports = router;