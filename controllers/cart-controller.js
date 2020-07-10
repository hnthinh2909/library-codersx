const db = require("../db.js");
var countProduct = 0;
let productInCart = [];

const mongoose = require("mongoose");
const Session = require("../models/session.js");
const Products = require("../models/products.js");

module.exports.index = function(req, res) {
	// let product = db.get("session").find({id: req.signedCookies.sessionId}).value();
	Session.find({id: req.signedCookies.sessionId}).exec().then(docs => {
		if(!docs[0]) {
			res.redirect("/products");
		}
		else {
			let listProduct = Object.keys(doc[0]);
			if(productInCart.length < listProduct.length) {
				for(let i = 0; i<listProduct.length; i++) {
					// productInCart.push(db.get("products").find({id: listProduct[i]}).value());
					Products.find({id: listProduct[i]}).exec().then(docs => {
						productInCart.push(docs[0]);
					})
				}
			}
				console.log(docs);
				console.log(productInCart[0].id);
			res.render("cart/index", {
				products: productInCart, 
				// csrfToken: req.csrfToken() 
			});
		}
	})
	
}

module.exports.indexPost = function(req, res) {
	let user = db.get("users").find({id: req.signedCookies.userId}).value();

	for(let j = 0; j < productInCart.length; j++) {
		db.get("transactions").push({userId: user.id, bookId: productInCart[j].id, bookTitle: productInCart[j].title, userName: user.name, image: productInCart[j].image}).write();
	}
	
	res.redirect("/products");
}

module.exports.addToCart = function(req, res, next) {
	let productId = req.params.productId;
	let sessionId = req.signedCookies.sessionId;

	// let countSession = db.get("session").find({id: req.signedCookies.sessionId}).value();
	// ---------------------------------------
	// var quantity = 1;
	// var userId = 1;
	// var productId = "111445GB3";

	// var col = db.getSisterDB("session").carts;
	// col.update(
	//     { _id: userId, status: 'active' }
	//   , {
	//       $set: { modified_on: new Date() }
	//     , $push: { products: {
	//         _id: productId
	//       , quantity: quantity
	//       , name: "Simsong Mobile"
	//       , price: 1000
	//     }}
	//   }, true);

	// ---------------------------------------

	if(!sessionId) {
		res.redirect("/products");
		return;
	}
	let count = 0;
	// let count = db.get("session")
	// 			  .find({id: sessionId})
	// 			  .get("cart." + productId, 0)
	// 			  .write();
	Session.find({id: sessionId}).exec().then(result => {
		if(!result[0].cart) {
			Session.insertOne({id: sessionId}, {$set: {cart : {productId : 0} }});
		}
		else {
			Session.updateOne({id: sessionId}, {$set: {cart : {prodcutId : count + 1}}})
		}
		countProduct++;
		Session.updateOne({id: sessionId}, {$set: {countProduct: countProduct}})
	})

	// db.get("session")
	//   .find({id: sessionId})
	//   .set("cart." + productId, count + 1)
	//   .write();
	// countProduct++; 
	// db.get("session")
	//   .find({id:sessionId})
	//   .assign({countProduct: countProduct})
	//   .write();
	res.redirect("/products");
}