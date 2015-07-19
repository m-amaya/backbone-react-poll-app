(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Poll = require('./model/Poll');
var PollCollection = require('./collection/PollCollection');
var PollCollectionView = require('./view/PollCollectionView.jsx');

var polls = new PollCollection();
var pollsView = new PollCollectionView({
  collection: polls
});

},{"./collection/PollCollection":2,"./model/Poll":4,"./view/PollCollectionView.jsx":6}],2:[function(require,module,exports){
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
var Poll = require('../model/Poll');
var BackboneMixin = require('../mixins/ComponentMixin');

var PollVote = React.createClass({displayName: "PollVote",
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
        React.createElement("div", {className: optClass}, this.props.poll.get(optClass)), 
        React.createElement("div", {onClick: this.upVote}, "Vote")
      )
    );
  }
});

var dataset = [
  {label: "Black", votes: 3 },
  {label: "Blue", votes: 4 },
  {label: "Green", votes: 6 },
];

var D3Chart = React.createClass({displayName: "D3Chart",
  getDefaultProps: function() {
    return {
      width: 360,
      height: 360,
      maxColHeight: 300,
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
    return (
      React.createElement("svg", {width: this.props.width, height: this.props.height}, 
        React.createElement("g", {transform: this.getTranslateStr(1,this.calcHeight(this.props.poll.get("opt1votes")))}, 
          React.createElement("rect", {width: this.getColWidth(), height: this.calcHeight(this.props.poll.get("opt1votes"))}), 
          React.createElement("text", {y: "-10", "text-anchor": "middle", "alignment-baseline": "middle"}, this.props.poll.get("opt1votes") + " Votes")
        ), 
        React.createElement("g", {transform: this.getTranslateStr(2,this.calcHeight(this.props.poll.get("opt2votes")))}, 
          React.createElement("rect", {width: this.getColWidth(), height: this.calcHeight(this.props.poll.get("opt2votes")), fill: "#eee"}), 
          React.createElement("text", {y: "-10", "text-anchor": "middle", "alignment-baseline": "middle"}, this.props.poll.get("opt2votes") + " Votes")
        ), 
        React.createElement("g", {transform: this.getTranslateStr(3,this.calcHeight(this.props.poll.get("opt3votes")))}, 
          React.createElement("rect", {width: this.getColWidth(), height: this.calcHeight(this.props.poll.get("opt3votes")), fill: "#888"}), 
          React.createElement("text", {y: "-10", "text-anchor": "middle", "alignment-baseline": "middle"}, this.props.poll.get("opt3votes") + " Votes")
        )
      )
    );
  }
});

var VoteDisplay = React.createClass({displayName: "VoteDisplay",
  render: function() {
    return (
      React.createElement("div", {className: "voteDisplay", id: "a"+this.props.poll.get("uuid")}, 
        React.createElement(D3Chart, {poll: this.props.poll})
      )
    );
  }
});

var PollComponent = React.createClass({displayName: "PollComponent",
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
        React.createElement(VoteDisplay, {poll: this.props.poll}), 
        React.createElement("div", {className: "question"}, this.props.poll.get("question")), 
        React.createElement(PollVote, {optSelect: "1", poll: this.props.poll}), 
        React.createElement(PollVote, {optSelect: "2", poll: this.props.poll}), 
        React.createElement(PollVote, {optSelect: "3", poll: this.props.poll})
      )
    );
  }
});


var PollGrid = React.createClass({displayName: "PollGrid",
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

var PollForm = React.createClass({displayName: "PollForm",
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
        React.createElement("input", {type: "text", placeholder: "Question", ref: "question", required: true, maxLength: "100"}), 
        React.createElement("input", {type: "text", placeholder: "Option 1", ref: "opt1", required: true, maxLength: "50"}), 
        React.createElement("input", {type: "text", placeholder: "Option 2", ref: "opt2", required: true, maxLength: "50"}), 
        React.createElement("input", {type: "text", placeholder: "Option 3", ref: "opt3", required: true, maxLength: "50"}), 
        React.createElement("button", {type: "submit"}, "Add Poll")
      )
    );
  }
});

module.exports = React.createClass({displayName: "exports",
  mixins: [BackboneMixin],
  getBackboneModels: function() {
    return [this.props.polls];
  },
  render: function() {
    return (
      React.createElement("div", {id: "main-content"}, 
        React.createElement("h1", null, "Keep Calm and Poll On"), 
        React.createElement(PollGrid, {polls: this.props.polls}), 
        React.createElement("div", {id: "form-content"}, 
          React.createElement(PollForm, {polls: this.props.polls})
        ), 
        React.createElement("div", {id: "chart"})
      )
    );
  }
});

},{"../mixins/ComponentMixin":3,"../model/Poll":4}],6:[function(require,module,exports){
var PollViewComponent = require('./PollCollectionComponent.jsx');
var PollFormComponent = require('./PollFormComponent.jsx');

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

},{"./PollCollectionComponent.jsx":5,"./PollFormComponent.jsx":7}],7:[function(require,module,exports){
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
    newPoll.save({}, {
      success: function(model, response, options) {
        console.log("Response from [POST]: " + JSON.stringify(response));
      },
      error: function(model, xhr, options) {
        console.log("Error from [POST]: " + JSON.stringify(xhr));
      }
    });
  },
  render: function() {
    return (
      React.createElement("form", {className: "pollForm", onSubmit: this.addPoll}, 
        React.createElement("input", {type: "text", placeholder: "Question", ref: "question", required: true}), 
        React.createElement("input", {type: "text", placeholder: "Option 1", ref: "opt1", required: true}), 
        React.createElement("input", {type: "text", placeholder: "Option 2", ref: "opt2", required: true}), 
        React.createElement("input", {type: "text", placeholder: "Option 3", ref: "opt3", required: true}), 
        React.createElement("button", {type: "submit"}, "Add Poll")
      )
    );
  }
});

},{"../model/Poll":4}]},{},[2,4,5,6,7,1]);
