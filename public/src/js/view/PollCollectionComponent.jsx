var BackboneMixin = require('../mixins/ComponentMixin');
var classNames = require('classnames');

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

var PollVote = React.createClass({
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
      <div className="pollVote">
        <div className={optClass}>{this.props.poll.get(optClass)}</div>
        <div onClick={this.upVote}>Vote</div>
        <div>Votes: {this.props.poll.get(optClass+"votes")}</div>
      </div>
    );
  }
});

module.exports = React.createClass({
  mixins: [BackboneMixin],
  getBackboneModels: function() {
    return [this.props.polls];
  },
  render: function() {
    var pollGrid = this.props.polls.map(function(poll) {
      return (
        <div className="poll">
          <div className="question">{poll.get("question")}</div>
          < PollVote optSelect="1" poll={poll} />
          < PollVote optSelect="2" poll={poll} />
          < PollVote optSelect="3" poll={poll} />
        </div>
      );
    });
    return <div id="pollGrid">{pollGrid}</div>;
  }
});