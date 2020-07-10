const db = require('../db');

const mongoose = require("mongoose");
const Users = require("../models/users.js");


module.exports.requireAuth = function(req, res, next) {
  if (!req.signedCookies.userId) {
    res.redirect('/auth/login');
    return;
  }

  // let user = db.get('users').find({ id: req.signedCookies.userId }).value();
  Users.find({_id: req.signedCookies.userId})
  .exec()
  .then(docs => {
    if (!docs) {
      res.redirect('/auth/login');
      return;
    }
    res.locals.user = docs[0];
    next();
  })
  .catch(err=> console.log(err));
};

module.exports.isAdmin = function(req, res, next) {
  let id = req.signedCookies.userId;
  // let checkAdmin = db.get("users").find({id: id}).value();
  Users.find({_id: id})
  .exec()
  .then(docs => {
    let admin = docs[0].isAdmin
    if(!admin) {
      res.redirect("/");
      return;
    }
    next();
  })
  .catch(err => console.log(err))
  
}

module.exports.getDataUser = function(req, res, next) {
  Users.find({_id: req.signedCookies.userId})
  .exec()
  .then(docs => {
    if (!docs) {
      res.redirect('/auth/login');
      return;
    }
    res.locals.user = docs[0];
    next();
  })
  .catch(err=> console.log(err));
}