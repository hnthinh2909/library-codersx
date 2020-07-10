const db = require("../db.js");
const cookieParser = require('cookie-parser');
const shortid = require('shortid');

const mongoose = require("mongoose");
const Products = require("../models/products.js");
const Session = require("../models/session.js");
const Users = require("../models/users.js");

var cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: process.env.UPLOAD_CLOUD_NAME,
  api_key: process.env.UPLOAD_API_KEY, 
  api_secret: process.env.UPLOAD_API_SECRET
});

module.exports.index = function(req, res, next) {
	let page = parseInt(req.query.page) || 1; //n
	let perPage = 8; // x

	let start = (page - 1) * perPage; // (n-1)*x
	let end = page * perPage; // (n-1)*x + x

	Products.find().limit(perPage).skip(end).exec().then(product => {
		Users.find().exec().then(user => {
			Session.find().exec().then(countCart => {
				res.render("products/index", {
					products: product,
					user,
					count: countCart
				})	
			})
		})
	})
}

module.exports.edit = function(req, res) {
	let productId = req.params.id;
	let product = db.get("products")
				  	.find({id: productId})
				  	.value();
	res.render("products/edit-product", {
		product: product, 
		id: productId
	});
}

module.exports.editPost = function(req, res) {
	db.get("products")
	  .find({id: req.body.id})
	  .assign({title: req.body.title, description: req.body.description})
	  .write()

	cloudinary.uploader.upload(req.file.path, function(error, result) { 
		req.body.image= result.url; 
		db.get("products")
		.find({id: req.body.id})
		.assign({image: req.body.image})
		.write();
	}); 
	res.redirect("/products/")
}







	