let db = require("../db.js");
const mongoose = require("mongoose");
const Session = require("../models/session.js");


module.exports = function(req, res, next) {
	// let cart = db.get('session').find({ id: req.signedCookies.sessionId}).value();
	Session.find({id: req.signedCookies.sessionId}).exec().then(docs => {
		res.locals.cart = docs;
		next();
	});
	
}