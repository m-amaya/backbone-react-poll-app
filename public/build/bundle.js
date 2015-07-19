(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Poll = require('./model/Poll');
var PollCollection = require('./collection/PollCollection');
var PollCollectionView = require('./view/PollCollectionView.jsx');

var polls = new PollCollection();
var pollsView = new PollCollectionView({
  collection: polls
});



var newPoll = new Poll({
  question: "What is your favorite movie?",
  opt1: "Jurassic Park",
  opt2: "Terminator",
  opt3: "Star Wars"
});


//var HttpService = {
//  getPolls: function (Polls) {
//    Polls.fetch({
//      success: function (collection, response, options) {
//        console.log("Response from [GET]: " + JSON.stringify(response));
//      },
//      error: function (collection, response, options) {
//        console.log("Error from [GET]: " + JSON.stringify(response));
//      }
//    });
//    return Polls;
//  },
//  addPoll: function (poll) {
//    poll.save({}, {
//      success: function (model, response, options) {
//        console.log("Response from [POST]: " + JSON.stringify(response));
//      },
//      error: function (model, xhr, options) {
//        console.log("Error from [POST]: " + JSON.stringify(xhr));
//      }
//    });
//  },
//  updatePoll: function (poll, opt) {
//    console.log("Setting opt to " + opt);
//    var optXvotes = "opt" + opt + "votes";
//    var newVote = poll.get(optXvotes) + 1;
//    poll.set(optXvotes, newVote);
//    poll.save({
//      opt: opt
//    }, {
//      success: function (model, response, options) {
//        console.log("Response from [PUT]: " + JSON.stringify(response));
//      },
//      error: function (model, xhr, options) {
//        console.log("Error from [PUT]: " + JSON.stringify(xhr));
//      }
//    });
//  },
//  delPoll: function (poll) {
//    poll.destroy({
//      success: function (model, response, options) {
//        console.log("Response from [DELETE]: " + JSON.stringify(response));
//      },
//      error: function (model, xhr, options) {
//        console.log("Error from [DELETE]: " + JSON.stringify(xhr));
//      }
//    });
//  }
//};

// Collection Events


// HTTP SERVICE

// create a new poll
//var newPoll = new Poll({
//  question: "Who is your favorite actor?",
//  opt1: "Charlize Theron",
//  opt2: "Tom Hardy",
//  opt3: "Meg Ryan"
//});
//
//// Get all polls
//crudOps.getPolls();
////if (newPoll.isNew()) {
////  crudOps.addPoll(newPoll);
////}
//
//// collection events
//polls.on("add", function (poll) {
//  console.log("Poll added: " + poll.get("question"));
//});
//
//polls.on("update", function (collection, options) {
//  console.log("Collection updated!");
//  // Add new poll
////  if (newPoll.isNew()) {
////    crudOps.addPoll(newPoll);
////  }
//  // Update first poll
////    var firstPoll = polls.at(0);
////    console.log("First poll to PUT: " + JSON.stringify(firstPoll));
////    crudOps.updatePoll(firstPoll, 1);
//  // Delete first poll
//  //crudOps.delPoll(firstPoll);
//});
//
//polls.on("change:opt1votes", function (model, options) {
//  console.log("opt1votes has been changed: " + JSON.stringify(model));
////  var firstPoll = polls.at(0);
////  console.log("First poll to DELETE: " + JSON.stringify(firstPoll));
////  crudOps.delPoll(firstPoll);
//});
//
//polls.on("change:opt2votes", function (model, options) {
//  console.log("opt2votes has been changed: " + JSON.stringify(model));
//});
//
//polls.on("change:opt3votes", function (model, options) {
//  console.log("opt3votes has been changed: " + JSON.stringify(model));
//});

},{"./collection/PollCollection":2,"./model/Poll":4,"./view/PollCollectionView.jsx":6}],2:[function(require,module,exports){
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
        React.createElement("div", {onClick: this.upVote}, "Vote"), 
        React.createElement("div", {className: "voteDisplay"}, "Votes: ", this.props.poll.get(optClass+"votes"))
      )
    );
  }
});

//  delPoll: function (poll) {
//    poll.destroy({
//      success: function (model, response, options) {
//        console.log("Response from [DELETE]: " + JSON.stringify(response));
//      },
//      error: function (model, xhr, options) {
//        console.log("Error from [DELETE]: " + JSON.stringify(xhr));
//      }
//    });
//  }

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
        )
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
