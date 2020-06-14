const db = require('../db');

module.exports.productsMiddleware = function(req, res, next) {
	// if(req.signedCookies.userId){
		
	// 	res.redirect("/products/");
	// 	return;
	// }
	let user = db.get('users').find({ id: req.signedCookies.userId }).value();
		res.locals.user = user;
	next();
}