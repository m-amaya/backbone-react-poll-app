var Poll = require('../model/Poll');

module.exports =
  Backbone.Collection.extend({
    model: Poll,
    url: 'https://young-spire-5586.herokuapp.com/api/polls'
  });
