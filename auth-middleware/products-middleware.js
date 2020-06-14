const db = require('../db');

module.exports.productsMiddleware = function(req, res, next) {
	let user = db.get('users').find({ id: req.signedCookies.userId }).value();
	res.locals.user = user;
	next();
}