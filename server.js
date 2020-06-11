require('dotenv').config()
const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const favicon = require('serve-favicon')
const path = require('path')
const cookieParser = require('cookie-parser')


const productsRoute = require("./routes/products-route.js");
const libraryRoute = require("./routes/library-route.js");
const usersRoute = require("./routes/users-route.js");
const transactionRoute = require("./routes/transactions-route.js");
const loginRoute = require("./routes/login-route.js");
const loginControllers = require("./controllers/login-controller.js");


const authRequire = require("./auth-middleware/login");

const port = 3000;

// to read file from db.json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cookieParser("asdasdasd123"));

// to set default direct of main folder
app.set("view engine", "pug");
app.set("views", "./views");

app.use("/auth", loginRoute);

// route index
app.get("/", authRequire.requireAuth, function(req, res) {
	res.render("library/index");
})

app.use("/products", authRequire.requireAuth, productsRoute);

app.use("/library", authRequire.requireAuth, libraryRoute);

app.use("/users", authRequire.requireAuth, usersRoute);

app.use("/transactions", authRequire.requireAuth, authRequire.isAdmin, transactionRoute);

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public/img', 'favicon.ico')));

// to log port we using
app.listen(port, function() {
	console.log("Server listening on port " + port)
});