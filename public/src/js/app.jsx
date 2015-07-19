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
