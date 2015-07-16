var pg = require('pg');
var uuid = require('node-uuid');

module.exports = {
  getPolls: function(req, res, client) {
    console.log(req.originalMethod + ' ' + req.originalUrl);
    var query = client.query("SELECT * from polls");
    query.on("row", function(row, result) {
      result.addRow(row);
    });
    query.on("end", function(result) {
      res.json(result.rows);
    });
    query.on("error", function(error) {
      res.json(error);
    });
  },
  addPoll: function(req, res, client) {
    console.log(req.originalMethod + ' ' + req.originalUrl);
    var query = client.query("INSERT INTO polls \
      (uuid, question, opt1, opt2, opt3) \
      VALUES ('"+uuid.v1()+"', '"+req.body.question+"', \
      '"+req.body.opt1+"', '"+req.body.opt2+"', '"+req.body.opt3+"')");
    query.on("end", function(result) {
      res.json(result);
    });
    query.on("error", function(error) {
      res.json(error);
    });
  },
  delPoll: function(req, res, client) {
    console.log(req.originalMethod + ' ' + req.originalUrl);
    var query = client.query("DELETE FROM polls WHERE uuid = '"+req.params.id+"'");
    query.on("end", function(result) {
      res.json(result);
    });
    query.on("error", function(error) {
      res.json(error);
    });
  },
  updatePoll: function(req, res, client) {
    console.log(req.originalMethod + ' ' + req.originalUrl);
    // grab data
    var votefor = {
      opt1: req.body.opt1,
      opt2: req.body.opt2,
      opt3: req.body.opt3
    }
    
    if (votefor.opt1) {
      console.log("Option 1 voted on.");
      var query = client.query("UPDATE polls SET opt1votes = opt1votes + 1 WHERE uuid = '"+req.params.id+"'");
      query.on("end", function(result) {
        res.json(result);
      });
      query.on("error", function(error) {
        res.json(error);
      });
    }
    
    if (votefor.opt2) {
      console.log("Option 2 voted on.");
      var query = client.query("UPDATE polls SET opt2votes = opt2votes + 1 WHERE uuid = '"+req.params.id+"'");
      query.on("end", function(result) {
        res.json(result);
      });
      query.on("error", function(error) {
        res.json(error);
      });
    }
    
    if (votefor.opt3) {
      console.log("Option 3 voted on.");
      var query = client.query("UPDATE polls SET opt3votes = opt3votes + 1 WHERE uuid = '"+req.params.id+"'");
      query.on("end", function(result) {
        res.json(result);
      });
      query.on("error", function(error) {
        res.json(error);
      });
    }
  }
}