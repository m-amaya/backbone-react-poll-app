var VoteDisplay = require('./VoteDisplayComponent.jsx');
var PollVote = require('./PollVoteComponent.jsx');

module.exports = React.createClass({
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
        < VoteDisplay poll={this.props.poll} />
        < PollVote optSelect="1" poll={this.props.poll} />
        < PollVote optSelect="2" poll={this.props.poll} />
        < PollVote optSelect="3" poll={this.props.poll} />
      </div>
    );
  }
});