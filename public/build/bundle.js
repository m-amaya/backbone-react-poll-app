(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Poll = require('./model/Poll');
var PollCollection = require('./collection/PollCollection');
var PollCollectionView = require('./view/PollCollectionView.jsx');

var polls = new PollCollection();
var pollsView = new PollCollectionView({
  collection: polls
});

},{"./collection/PollCollection":2,"./model/Poll":4,"./view/PollCollectionView.jsx":7}],2:[function(require,module,exports){
var Poll = require('../model/Poll');

module.exports =
  Backbone.Collection.extend({
    model: Poll,
    url: 'http://localhost:8000/api/polls'
  });

},{"../model/Poll":4}],3:[function(require,module,exports){
/*
 * https://github.com/facebook/react/blob/1be9a9e/examples/todomvc-backbone/js/app.js#L148-L171
 * 
 * A generic Mixin that can be added to any component that
 * should react to changes in a Backbone component. The
 * use cases we've identified thus far are for Collections --
 * since they trigger a change event whenever any of their
 * constituent items are changes there's no need to reconcile
 * for regular models.
 * 
 * Place this mixin near the top of your component hierarchy.
 */

module.exports = {
  componentDidMount: function() {
    // Whenever there may be a change in the Backbone data,
    // trigger a reconcile
    this.getBackboneModels().forEach(function(model) {
      model.on('add change remove', this.forceUpdate.bind(this, null), this);
    }, this);
  },
  componentWillUnmount: function() {
    // Ensure that we clean up any dangling references when
    // the component is destroyed
    this.getBackboneModels().forEach(function(model) {
      model.off(null, null, this);
    }, this);
  }
}

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
module.exports = React.createClass({displayName: "exports",
  getDefaultProps: function() {
    return {
      width: 290,
      height: 290,
      maxColHeight: 230,
      gutter: 5
    }
  },
  getColWidth: function() {
    return (this.props.width / 3) - (2*this.props.gutter);
  },
  getTranslateStr: function(colNum, colHeight) {
    var tx = ((colNum-1)*(this.props.width/3)) + this.props.gutter;
    var ty = this.props.height - colHeight - 10;
    return "translate(" + tx + "," + ty + ")";
  },
  calcHeight: function(currVote) {
    var maxVote = Math.max(this.props.poll.get("opt1votes"),this.props.poll.get("opt2votes"),this.props.poll.get("opt3votes"));
    return (this.props.maxColHeight*currVote)/maxVote;
  },
  render: function() {
    if(this.props.poll.get("opt1votes") || this.props.poll.get("opt2votes") || this.props.poll.get("opt3votes")) {
      return (
        React.createElement("svg", {width: this.props.width, height: this.props.height}, 
          React.createElement("g", {transform: this.getTranslateStr(1,this.calcHeight(this.props.poll.get("opt1votes")))}, 
            React.createElement("rect", {width: this.getColWidth(), height: this.calcHeight(this.props.poll.get("opt1votes")), fill: "#CCCCCC"}), 
            React.createElement("text", {fill: "#555555", y: "-10"}, this.props.poll.get("opt1votes") + " Votes")
          ), 
          React.createElement("g", {transform: this.getTranslateStr(2,this.calcHeight(this.props.poll.get("opt2votes")))}, 
            React.createElement("rect", {width: this.getColWidth(), height: this.calcHeight(this.props.poll.get("opt2votes")), fill: "#eee"}), 
            React.createElement("text", {fill: "#555555", y: "-10"}, this.props.poll.get("opt2votes") + " Votes")
          ), 
          React.createElement("g", {transform: this.getTranslateStr(3,this.calcHeight(this.props.poll.get("opt3votes")))}, 
            React.createElement("rect", {width: this.getColWidth(), height: this.calcHeight(this.props.poll.get("opt3votes")), fill: "#FC8C7E"}), 
            React.createElement("text", {fill: "#555555", y: "-10"}, this.props.poll.get("opt3votes") + " Votes")
          )
        )
      );
    } else {
      return (
        React.createElement("svg", {width: this.props.width, height: this.props.height}, 
          React.createElement("rect", {width: this.props.width, height: this.props.height, fill: "#eee"})
        )
      );
    }
  }
});

},{}],6:[function(require,module,exports){
var PollGrid = require('./PollGridComponent.jsx');
var PollForm = require('./PollFormComponent.jsx');
var BackboneMixin = require('../mixins/ComponentMixin');

module.exports = React.createClass({displayName: "exports",
  mixins: [BackboneMixin],
  getBackboneModels: function() {
    return [this.props.polls];
  },
  render: function() {
    return (
      React.createElement("div", {id: "main-content"}, 
        React.createElement("h1", {className: "title"}, "keep calm and ", React.createElement("span", null, "POLL ON")), 
        React.createElement("div", {className: "pollCount"}, "Poll Count", React.createElement("span", null, this.props.polls.size())), 
        React.createElement(PollGrid, {polls: this.props.polls}), 
        React.createElement("div", {id: "form-content"}, 
          React.createElement(PollForm, {polls: this.props.polls})
        ), 
        React.createElement("footer", null, 
          React.createElement("i", {className: "fa fa-copyright"}), " 2015 mamaya (github.com/m-amaya)"
        )
      )
    );
  }
});

},{"../mixins/ComponentMixin":3,"./PollFormComponent.jsx":9,"./PollGridComponent.jsx":10}],7:[function(require,module,exports){
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
        React.createElement(PollViewComponent, {polls: this.collection}),
        document.body
      );
      return this;
    }
  });

},{"../model/Poll":4,"./PollCollectionComponent.jsx":6,"./PollFormComponent.jsx":9}],8:[function(require,module,exports){
var VoteDisplay = require('./VoteDisplayComponent.jsx');
var PollVote = require('./PollVoteComponent.jsx');

module.exports = React.createClass({displayName: "exports",
  delPoll: function() {
    var that = this;
    this.props.poll.destroy({
      success: function(model, response, options) {
        console.log("Response from [DELETE]: " + JSON.stringify(response));
        that.props.polls.remove(model);
      },
      error: function(model, xhr, options) {
        console.log("Error from [DELETE]: " + JSON.stringify(xhr));
      }
    });
  },
  render: function() {
    return (
      React.createElement("div", {className: "poll"}, 
        React.createElement("i", {className: "fa fa-close", onClick: this.delPoll}), 
        React.createElement("div", {className: "question"}, this.props.poll.get("question")), 
        React.createElement(VoteDisplay, {poll: this.props.poll}), 
        React.createElement(PollVote, {optSelect: "1", poll: this.props.poll}), 
        React.createElement(PollVote, {optSelect: "2", poll: this.props.poll}), 
        React.createElement(PollVote, {optSelect: "3", poll: this.props.poll})
      )
    );
  }
});

},{"./PollVoteComponent.jsx":11,"./VoteDisplayComponent.jsx":12}],9:[function(require,module,exports){
var Poll = require('../model/Poll');

module.exports = React.createClass({displayName: "exports",
  addPoll: function(e) {
    e.preventDefault();
    var question = React.findDOMNode(this.refs.question).value.trim();
    var opt1 = React.findDOMNode(this.refs.opt1).value.trim();
    var opt2 = React.findDOMNode(this.refs.opt2).value.trim();
    var opt3 = React.findDOMNode(this.refs.opt3).value.trim();
    var newPoll = new Poll({
      question: question,
      opt1: opt1,
      opt2: opt2,
      opt3: opt3
    });
    var that = this;
    newPoll.save({}, {
      success: function(model, response, options) {
        console.log("Response from [POST]: " + JSON.stringify(response));
        that.props.polls.add(model);
        React.findDOMNode(that.refs.question).value = "";
        React.findDOMNode(that.refs.opt1).value = "";
        React.findDOMNode(that.refs.opt2).value = "";
        React.findDOMNode(that.refs.opt3).value = "";
      },
      error: function(model, xhr, options) {
        console.log("Error from [POST]: " + JSON.stringify(xhr));
      }
    });
  },
  render: function() {
    return (
      React.createElement("form", {className: "pollForm", onSubmit: this.addPoll}, 
        React.createElement("label", {for: "questionIn", id: "questionLbl"}, "Question"), 
        React.createElement("input", {id: "questionIn", type: "text", ref: "question", required: true, maxLength: "100"}), 
        React.createElement("label", {for: "opt1In", id: "opt1Lbl"}, "Option #1"), 
        React.createElement("input", {id: "opt1In", type: "text", ref: "opt1", required: true, maxLength: "50"}), 
        React.createElement("label", {for: "opt2In", id: "opt2Lbl"}, "Option #2"), 
        React.createElement("input", {id: "opt2In", type: "text", ref: "opt2", required: true, maxLength: "50"}), 
        React.createElement("label", {for: "opt3In", id: "opt3Lbl"}, "Option #3"), 
        React.createElement("input", {id: "opt3In", type: "text", ref: "opt3", required: true, maxLength: "50"}), 
        React.createElement("button", {type: "submit"}, "ADD POLL")
      )
    );
  }
});

},{"../model/Poll":4}],10:[function(require,module,exports){
var PollComponent = require('./PollComponent.jsx');

module.exports = React.createClass({displayName: "exports",
  render: function() {
    var that = this;
    var pollGrid = this.props.polls.map(function(poll) {
      return (
        React.createElement(PollComponent, {poll: poll, polls: that.props.polls})
      );
    });
    return React.createElement("div", {id: "pollGrid"}, pollGrid);
  }
});

},{"./PollComponent.jsx":8}],11:[function(require,module,exports){
module.exports = React.createClass({displayName: "exports",
  upVote: function(){
    var optXvotes = "opt" + this.props.optSelect + "votes";
    var oldVote = this.props.poll.get(optXvotes);
    var newVote = oldVote + 1;
    this.props.poll.set(optXvotes, newVote);
    this.props.poll.save({
      opt: this.props.optSelect
    }, {
      success: function(model, response, options) {
        if (response.message) {
          model.set(optXvotes, oldVote);
        }
        console.log("Response from [PUT]: " + JSON.stringify(response));
      },
      error: function(model, xhr, options) {
        model.set(optXvotes, oldVote);
        console.log("Error from [PUT]: " + JSON.stringify(xhr));
      }
    });
  },
  render: function() {
    var optClass = "opt" + this.props.optSelect;
    return (
      React.createElement("div", {className: "pollVote"}, 
        React.createElement("div", {className: "opt " + optClass, onClick: this.upVote}, 
          this.props.poll.get(optClass))
      )
    );
  }
});

},{}],12:[function(require,module,exports){
var D3Chart = require('./D3ChartComponent.jsx');

module.exports = React.createClass({displayName: "exports",
  render: function() {
    return (
      React.createElement("div", {className: "voteDisplay", id: "a"+this.props.poll.get("uuid")}, 
        React.createElement(D3Chart, {poll: this.props.poll})
      )
    );
  }
});

},{"./D3ChartComponent.jsx":5}]},{},[2,3,4,5,6,7,8,9,10,11,12,1]);
