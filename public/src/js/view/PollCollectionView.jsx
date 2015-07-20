var PollViewComponent = require('./PollCollectionComponent.jsx');
var PollFormComponent = require('./PollFormComponent.jsx');
var Poll = require('../model/Poll');

module.exports =
  Backbone.View.extend({
    el: 'body',
    initialize: function () {
      this.listenTo(
        this.collection, 'add update change:opt1votes change:opt2votes change:opt3votes', this.render, this
      );
      this.collection.fetch({
        success: function (collection, response, options) {
          console.log("Collection initialized...");
          // if no items in collection on page load,
          // insert a default poll to render
          if (collection.length === 0) {
            var initPoll = new Poll({
              question: "Which new installment of these major movie franchises are you looking forward to this summer?",
              opt1: "The Terminator",
              opt2: "Star Wars",
              opt3: "Jurassic Park"
            });
            var coll = collection;
            initPoll.save({}, {
              success: function (model, response, options) {
                console.log("Response from [POST]: " + JSON.stringify(response));
                coll.add(model);
              },
              error: function (model, xhr, options) {
                console.log("Error from [POST]: " + JSON.stringify(xhr));
              }
            });
          }
        },
        error: function (collection, response, options) {
          console.log("Houston, we have a problem: " + JSON.stringify(response));
        }
      });
    },
    render: function () {
      React.render( 
        < PollViewComponent polls = {this.collection} />,
        document.body
      );
      return this;
    }
  });
