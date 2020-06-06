const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const favicon = require('serve-favicon')
const path = require('path')


const libraryRoute = require("./routes/library-route.js");
const usersRoute = require("./routes/users-route.js");
const transactionRoute = require("./routes/transactions-route.js");

const port = 3000;

// to read file from db.json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));


// to set default direct of main folder
app.set("view engine", "pug");
app.set("views", "./views");


// route index
app.get("/", function(req, res) {
	res.render("library/index");
})

app.use("/library", libraryRoute);

app.use("/users", usersRoute);

app.use("/transactions", transactionRoute);

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public/img', 'favicon.ico')));

// to log port we using
app.listen(port, function() {
	console.log("Server listening on port " + port)
});