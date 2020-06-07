module.exports.createPost = function(req, res, next) {
	let errors = [];

	if(!req.body.name) {
		errors.push("Name is required!");
	}

	if(!req.body.des) {
		errors.push("Descreption is required!");
	}

	if(req.body.name.length > 30) {
		errors.push("Your name is long over 30 character!")
	}

	if(errors.length) {
		res.render("library/create", {
			errors: errors,
			values: req.body
		})
		return;
	}

	next();
}