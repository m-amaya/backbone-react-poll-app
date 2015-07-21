// modules ============================================
var express              = require('express');
var app                  = express();
var bodyParser           = require('body-parser');
var methodOverride       = require('method-override');
var pg                   = require('pg');

// configuration ======================================
//var db = require('./app/db/config');
var port = process.env.PORT || 8000;
//var client = db.client();
//client.connect(function(err, client) {
//  if(err) { "Oops! Could not connect to db: " + err }
//  console.log("Successfully connected to db...");
//});
//var connectionString = "postgres://*USERNAME*:*PASSWORD*@*HOST*:*PORT:/*DATABASE*"

var client;

var connectionString = "postgres://vfnhvzutbzgwsl:elYxFE1-dgIPd72uY9_9-WsiG8@ec2-54-83-36-176.compute-1.amazonaws.com:5432/d7f2urmltuej4j"

pg.connect(connectionString, function(err, client, done) {
  if(err) { "Oops! Could not connect to db: " + err }
  console.log("Successfully connected to db...");
  client = this.client;
});

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + '/public'));

// routes =============================================
require('./app/routes')(app, client);

// start app ==========================================
app.listen(port);
console.log("Magic happens on port " + port);
exports = module.exports = app;