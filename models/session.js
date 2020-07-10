const mongoose = require("mongoose");

const sessionSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	sessionId: String,
	cart : {
		productId : Number,
	}
});

module.exports = mongoose.model('sesion', sessionSchema);