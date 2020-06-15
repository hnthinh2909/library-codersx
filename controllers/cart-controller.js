const db = require("../db.js");
var countProduct = 0;

module.exports.index = function(req, res, next) {
	// db.get("session")
	//   .find({id: req.signedCookies.sessionId})
	//   .push({countProduct: countProduct})
	//   .write();
	res.render("cart/index");
}

module.exports.addToCart = function(req, res, next) {
	let productId = req.params.productId;
	let sessionId = req.signedCookies.sessionId;

	let countSession = db.get("session").find({id: req.signedCookies.sessionId}).value();
	// console.log(Object.values(countSession.cart));
	
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
	countProduct++; 
	db.get("session")
	  .find({id:sessionId})
	  .assign({countProduct: countProduct})
	  .write();
	res.redirect("/products");
}