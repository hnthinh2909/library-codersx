let db = require("../db.js");

module.exports = function(req, res, next) {
	let cart = db.get('session').find({ id: req.signedCookies.sessionId}).value();
	res.locals.cart = cart;
	next();
}