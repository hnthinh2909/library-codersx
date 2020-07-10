const mongoose = require("mongoose");

const booksSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: String,
	description: String,
});

module.exports = mongoose.model('books', booksSchema);