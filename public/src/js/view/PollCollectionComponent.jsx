var Poll = require('../model/Poll');
var BackboneMixin = require('../mixins/ComponentMixin');

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
        <div className="voteDisplay">Votes: {this.props.poll.get(optClass+"votes")}</div>
      </div>
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

var PollComponent = React.createClass({
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
      <div className="poll">
        <i className="fa fa-close" onClick={this.delPoll}></i>
        <div className="question">{this.props.poll.get("question")}</div>
        < PollVote optSelect="1" poll={this.props.poll} />
        < PollVote optSelect="2" poll={this.props.poll} />
        < PollVote optSelect="3" poll={this.props.poll} />
      </div>
    );
  }
});


var PollGrid = React.createClass({
  render: function() {
    var that = this;
    var pollGrid = this.props.polls.map(function(poll) {
      return (
        < PollComponent poll={poll} polls={that.props.polls} />
      );
    });
    return <div id="pollGrid">{pollGrid}</div>;
  }
});

var PollForm = React.createClass({
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
      <form className="pollForm" onSubmit={this.addPoll}>
        <input type="text" placeholder="Question" ref="question" required maxLength="100" />
        <input type="text" placeholder="Option 1" ref="opt1" required maxLength="50" />
        <input type="text" placeholder="Option 2" ref="opt2" required maxLength="50" />
        <input type="text" placeholder="Option 3" ref="opt3" required maxLength="50" />
        <button type="submit">Add Poll</button>
      </form>
    );
  }
});

module.exports = React.createClass({
  mixins: [BackboneMixin],
  getBackboneModels: function() {
    return [this.props.polls];
  },
  render: function() {
    return (
      <div id="main-content">
        <h1>Keep Calm and Poll On</h1>
        < PollGrid polls={this.props.polls} />
        <div id="form-content">
          < PollForm polls={this.props.polls} />
        </div>
      </div>
    );
  }
});