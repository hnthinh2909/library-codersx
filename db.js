const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync("db.json");
const db = low(adapter);

db.defaults({books: [], users:[], transactions:[], session:[]}).write();

module.exports = db;