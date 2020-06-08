const express = require('express');
const router = express.Router();

const authLogin = require("../controllers/login-controller.js");

router.get("/login", authLogin.login);

router.post("/login", authLogin.loginPost);

module.exports = router;