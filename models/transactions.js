const mongoose = require("mongoose");

const transactionsSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	book: String,
	user: String,
});

module.exports = mongoose.model('transactions', transactionsSchema);