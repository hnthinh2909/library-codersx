const express = require('express');
const router = express.Router();

const resetPassword = require("../controllers/reset-controller.js");

router.get("/", resetPassword.index);

router.post("/", resetPassword.indexPost);

module.exports = router;