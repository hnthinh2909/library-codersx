require('dotenv').config();
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const favicon = require('serve-favicon');
const path = require('path');

const productsRoute = require("./routes/products-route.js");
const libraryRoute = require("./routes/library-route.js");
const usersRoute = require("./routes/users-route.js");
const transactionRoute = require("./routes/transactions-route.js");
const loginRoute = require("./routes/login-route.js");
const profileRoute = require("./routes/profile-route.js");

const loginControllers = require("./controllers/login-controller.js");

const authRequire = require("./auth-middleware/login");
const productsMiddleware = require("./auth-middleware/products-middleware.js");
const sessionMiddleware = require("./session-middleware/session-middleware.js");
const cartRoute = require("./routes/cart-route.js");
const resetPwdRoute = require("./routes/reset-route.js");
const countProductMiddleware = require("./session-middleware/countproduct-middleware.js");

// const csrfProtection = csrf({ cookie: true });

const port = 3000;

// to read file from db.json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cookieParser("asdasdasd123"));
// app.use(csrf({ cookie: true }))

// to set default direct of main folder
app.set("view engine", "pug");
app.set("views", "./views");

app.use("/auth", loginRoute);
app.use(sessionMiddleware);
app.use(countProductMiddleware);

// route index
app.get("/", productsMiddleware.productsMiddleware, function(req, res) {
	res.render("library/index");
})

app.get("/logout", 
	function(req, res, next) {
	console.log(req.cookie);
	res.cookie("userId", {maxAge: 0})
	next();
}, 
	function(req, res) {
	res.redirect("/auth/login")
})



app.use("/profile", authRequire.requireAuth, profileRoute);

app.use("/products", productsMiddleware.productsMiddleware, productsRoute);

app.use("/library", authRequire.requireAuth, libraryRoute);

app.use("/users", usersRoute);

app.use("/transactions", authRequire.requireAuth, authRequire.isAdmin, transactionRoute);

app.use("/cart", cartRoute);

app.use("/resetpassword", resetPwdRoute);

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public/img', 'favicon.ico')));

// to log port we using
app.listen(port, function() {
	console.log("Server listening on port " + port)
});



/*
1. Fix db.get -- done
2. api
3. add mongodb cloud with mongoose
4. deploy heroku
*/