const md5 = require('md5');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const db = require("../db.js");
const cookieParser = require('cookie-parser')

// sendgrid
// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// const msg = {
//   to: 'hnthinh2909@gmail.com',
//   from: 'ethan2909@gmail.com',
//   subject: 'Sending with Twilio SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// };

let countLogin = 0;

module.exports.login =  function(req, res) {
	res.render("auth/login");
}

module.exports.loginPost = function(req, res, next) {
	let email = req.body.email;
	let password = req.body.password; 
	let hashedPwd = md5(password);
	let captcha = db.get("captcha").value();
	// console.log(captcha);

	let user = db.get("users").find({email: email}).value();

	
	// console.log(user.password);
	if(password === "") {
		res.render("auth/login", {
			errors: ["Errors: Email and Password is empty!"]
		})
		return;
	}

	if(password !== "") {
		// still error log on terminal if password is empty
		const hash = bcrypt.hashSync(password, saltRounds);
		const loadHash = bcrypt.compareSync(password, user.password);
		// console.log(loadHash);

		console.log(countLogin);
		if(countLogin == 5) {
			const sgMail = require('@sendgrid/mail');
			sgMail.setApiKey(process.env.SENDGRID_API_KEY);
			const msg = {
				to: user.email,
				from: '18t1021303@husc.edu.vn',
				subject: 'Sending with Twilio SendGrid is Fun',
				text: 'and easy to do anywhere, even with Node.js',
				html: '<h1>Easy to do anywhere, even with Node.js</strong>',
				};
				sgMail.send(msg).then(() => {
			    	console.log('Message sent')
				}).catch((error) => {
				    console.log(error.response.body)
				    // console.log(error.response.body.errors[0].message)
				})
			res.render("auth/validate-login", {
				errors: ["Because you login 5 times wrong. Wait 30 seconds and retry."]
			})
			countLogin = 0;
			return;
		}
		

		if(!user) {
			countLogin++;
			res.render("auth/login", {
				errors: ["Your email is not exist!"],
				values: req.body
			})
			
			return;
		}
		
		if(!loadHash) {
			countLogin++;
			res.render("auth/login", {
				errors: ["Your password is wrong!"],
				values: req.body
			});
			
			return;
		}
	}

	res.cookie("userId", user.id, {signed: true});
	console.dir(req.signedCookies.userId);
	res.redirect("/");
}