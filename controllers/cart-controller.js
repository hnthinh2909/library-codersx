const db = require("../db.js");
var countProduct = 0;
let productInCart = [];

module.exports.index = function(req, res, next) {
	let product = db.get("session").find({id: req.signedCookies.sessionId}).value();
	if(!product.cart) {
		res.redirect("/products");
	}
	let listProduct = Object.keys(product.cart);
	for(let i = 0; i<listProduct.length; i++) {
		productInCart.push(db.get("products").find({id: listProduct[i]}).value());
	}
	// console.log(productInCart);

	res.render("cart/index", {
		products: productInCart
	});
}

module.exports.addToCart = function(req, res, next) {
	let productId = req.params.productId;
	let sessionId = req.signedCookies.sessionId;

	let countSession = db.get("session").find({id: req.signedCookies.sessionId}).value();
	
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