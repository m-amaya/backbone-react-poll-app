var path = require('path');
var express = require('express');
var dbops = require('./db/db');

module.exports = function (app, client) {

  // SET HEADERS ======================================
  app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

  // API ROUTES =======================================
  var router = express.Router();

  router.route('/polls')
    // GET '/api/polls' - get all polls in db
    .get(function (req, res) {
      dbops.getPolls(req, res, client);
      // POST '/api/polls' - add poll to db
    }).post(function (req, res) {
      dbops.addPoll(req, res, client);
    });

  router.route('/polls/:id')
    // PUT '/api/polls/:id' -- update specified poll
    .put(function (req, res) {
      dbops.updatePoll(req, res, client);
      // DELETE '/api/polls/:id' -- delete specified poll
    }).delete(function (req, res) {
      dbops.delPoll(req, res, client);
    });

  app.use('/api', router);

  // FRONTEND ROUTES ==================================
  // for all other routes, send to Backbone
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
  });

}
