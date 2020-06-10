const db = require('../db');

module.exports.requireAuth = function(req, res, next) {
  if (!req.cookies.userId) {
    res.redirect('/auth/login');
    return;
  }

  let user = db.get('users').find({ id: req.cookies.userId }).value();

  if (!user) {
    res.redirect('/auth/login');
    return;
  }

  next();
};

module.exports.isAdmin = function(req, res, next) {
  let id = req.cookies.userId;
  let checkAdmin = db.get("users").find({id: id}).value();
  let admin = checkAdmin.isAdmin
  if(!admin) {
    res.redirect("/");
    return;
  }

  next();
}
