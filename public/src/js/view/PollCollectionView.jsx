var PollCollectionComponent = require('./PollCollectionComponent.jsx');

module.exports =
  Backbone.View.extend({
    el: '#pollCollectionView',
    initialize: function () {
      this.listenTo(
        this.collection, 'add update change:opt1votes change:opt2votes change:opt3votes', this.render, this
      );
      this.collection.fetch({
        success: function (collection, response, options) {
          console.log("Collection initialized...");
        },
        error: function (collection, response, options) {
          console.log("Houston, we have a problem: " + JSON.stringify(response));
        }
      });
    },
    render: function () {
      React.render(
        <PollCollectionComponent polls={this.collection} />,
        document.getElementById('pollCollectionView')
      );
      return this;
    }
  });
