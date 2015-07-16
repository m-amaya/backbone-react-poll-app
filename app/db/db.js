var pg = require('pg');
var db = require('./config');


// test connection
var client = db.client();

client.connect(function(err, client) {
  console.log("Successfully connected to db.");
});