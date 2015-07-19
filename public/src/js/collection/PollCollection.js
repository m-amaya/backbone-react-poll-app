var Poll = require('../model/Poll');

module.exports =
  Backbone.Collection.extend({
    model: Poll,
    url: 'http://localhost:8000/api/polls',
//    initialize: function (options) {
//      this.fetch({
//        success: function (collection, response, options) {
//          console.log("Collection initialized...");
//        },
//        error: function (collection, response, options) {
//          console.log("Houston, we have a problem: " + JSON.stringify(response));
//        }
//      });
//      this.on("update", function (collection, options) {
//        console.log("Collection updated...");
//      });
//      this.on("add", function(poll) {
//        console.log("Poll added: " + poll.get("question"));
//      });
//      this.on("change:opt1votes", function (model, options) {
//        console.log("Option 1 has been voted on.");
//      });
//      this.on("change:opt2votes", function (model, options) {
//        console.log("Option 2 has been voted on.");
//      });
//      this.on("change:opt3votes", function (model, options) {
//        console.log("Option 3 has been voted on.");
//      });
//    }
  });
