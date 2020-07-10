var count = 1;
module.exports.checkCookie = function(req, res, next) {
	res.cookie("cookie", count);
	count++;
	// console.log(count);
	next();
}
