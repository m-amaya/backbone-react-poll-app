var Poll = require('../model/Poll');

module.exports =
  Backbone.Collection.extend({
    model: Poll,
    url: 'http://localhost:8000/api/polls'
  });
