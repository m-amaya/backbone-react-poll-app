module.exports = Backbone.Model.extend({
  defaults: {
    question: "",
    opt1: "",
    opt2: "",
    opt3: "",
    opt1votes: 0,
    opt2votes: 0,
    opt3votes: 0
  },
  idAttribute: "uuid",
  initialize: function() {
    this.on("invalid", function(model, error) {
      console.log("Houston, we have a problem: " + error);
    });
  },
  constructor: function(attributes, options) {
    Backbone.Model.apply(this, arguments);
  },
  validate: function(attr) {
    if (!attr.question) {
      return "Must enter a question.";
    }
    if (!attr.opt1 || !attr.opt2 || !attr.opt3) {
      return "Must enter an option here.";
    }
  },
  urlRoot: "http://localhost:8000/api/polls"
});