let db = require("../db.js");
const shortid = require('shortid');
const mongoose = require("mongoose");
const Session = require("../models/session.js");


module.exports = function(req, res, next) {
	if(!req.signedCookies.sessionId) {
		var sessionId = shortid.generate();
		res.cookie('sessionId', sessionId, {
			signed: true
		})

		// db.get('session').push({id: sessionId}).write();
		const session = new Session({
			_id: new mongoose.Types.ObjectId(),
			sessionId: sessionId
		});
		session.save().then(result =>console.log(result)).catch(err => console.log(err));
	}
	next();
}