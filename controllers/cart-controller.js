const db = require("../db.js");

module.exports.index = function(req, res, next) {
	res.render("cart/index");
}

module.exports.addToCart = function(req, res, next) {
	let productId = req.params.productId;
	let sessionId = req.signedCookies.sessionId;

	if(!sessionId) {
		res.redirect("/products");
		return;
	}

	let count = db.get("session")
				  .find({id: sessionId})
				  .get("cart." + productId, 0)
				  .write();

	db.get("session")
	  .find({id: sessionId})
	  .set("cart." + productId, count + 1)
	  .write();
	res.redirect("/products");
}