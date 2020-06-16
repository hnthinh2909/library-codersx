const db = require("../db.js");
const cookieParser = require('cookie-parser');
const shortid = require('shortid');

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

	let user = db.get("users").find({id: req.signedCookies.userId}).value()
	let countCart = db.get("session").find({id: req.signedCookies.sessionId}).value();

	res.render("products/index", {
		products: db.get("products").drop(start).take(perPage).value(),
		user,
		count: countCart.countProduct
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







	