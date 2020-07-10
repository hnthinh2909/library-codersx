const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: String,
	email: String,
	password: String,
	avatar: String,
	phoneNumber: String,
	isAdmin: Boolean
});

module.exports = mongoose.model('users', usersSchema);