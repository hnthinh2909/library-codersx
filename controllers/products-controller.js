const db = require("../db.js");
const cookieParser = require('cookie-parser');
const shortid = require('shortid');

module.exports.index = function(req, res, next) {
	let page = parseInt(req.query.page) || 1; //n
	let perPage = 8; // x

	let start = (page - 1) * perPage; // (n-1)*x
	let end = page * perPage; // (n-1)*x + x

	res.render("products/index", {
		products: db.get("products").drop(start).take(perPage).value()
	})
}