(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
  Copyright (c) 2015 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/

(function () {
	'use strict';

	function classNames () {

		var classes = '';

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if ('string' === argType || 'number' === argType) {
				classes += ' ' + arg;

			} else if (Array.isArray(arg)) {
				classes += ' ' + classNames.apply(null, arg);

			} else if ('object' === argType) {
				for (var key in arg) {
					if (arg.hasOwnProperty(key) && arg[key]) {
						classes += ' ' + key;
					}
				}
			}
		}

		return classes.substr(1);
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (typeof define === 'function' && typeof define.amd === 'object' && define.amd){
		// AMD. Register as an anonymous module.
		define(function () {
			return classNames;
		});
	} else {
		window.classNames = classNames;
	}

}());

},{}],2:[function(require,module,exports){
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

},{"./collection/PollCollection":3,"./model/Poll":5,"./view/PollCollectionView.jsx":7}],3:[function(require,module,exports){
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

},{"../model/Poll":5}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
var BackboneMixin = require('../mixins/ComponentMixin');
var classNames = require("./../../../libs/classnames/index.js");

var PollVote = React.createClass({displayName: "PollVote",
  handleClick: function(){
    console.log("Handle vote update here.");
  },
  render: function() {
    return (
      React.createElement("div", {className: "pollVote"}, 
        React.createElement("div", {className: this.props.optClass}, this.props.poll.get(this.props.optClass)), 
        React.createElement("a", {href: "#", onClick: this.handleClick}, "Vote")
      )
    );
  }
});

module.exports = React.createClass({displayName: "exports",
  //mixins: [BackboneMixin],
  getBackboneModels: function() {
    return [this.props.polls];
  },
  render: function() {
    var pollGrid = this.props.polls.map(function(poll) {
      return (
        React.createElement("div", {className: "poll"}, 
          React.createElement("div", {className: "question"}, poll.get("question")), 
          React.createElement(PollVote, {optClass: "opt1", poll: poll}), 
          React.createElement(PollVote, {optClass: "opt2", poll: poll}), 
          React.createElement(PollVote, {optClass: "opt3", poll: poll})
        )
      );
    });
    return React.createElement("div", {id: "pollGrid"}, pollGrid);
  }
});

},{"../mixins/ComponentMixin":4,"./../../../libs/classnames/index.js":1}],7:[function(require,module,exports){
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
        React.createElement(PollCollectionComponent, {polls: this.collection}),
        document.getElementById('pollCollectionView')
      );
      return this;
    }
  });

},{"./PollCollectionComponent.jsx":6}]},{},[3,5,6,7,2]);
