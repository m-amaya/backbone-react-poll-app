var BackboneMixin = require('../mixins/ComponentMixin');
var classNames = require('classnames');

var PollVote = React.createClass({
  handleClick: function(){
    console.log("Handle vote update here.");
  },
  render: function() {
    return (
      <div className="pollVote">
        <div className={this.props.optClass}>{this.props.poll.get(this.props.optClass)}</div>
        <a href="#" onClick={this.handleClick}>Vote</a>
      </div>
    );
  }
});

module.exports = React.createClass({
  //mixins: [BackboneMixin],
  getBackboneModels: function() {
    return [this.props.polls];
  },
  render: function() {
    var pollGrid = this.props.polls.map(function(poll) {
      return (
        <div className="poll">
          <div className="question">{poll.get("question")}</div>
          < PollVote optClass="opt1" poll={poll} />
          < PollVote optClass="opt2" poll={poll} />
          < PollVote optClass="opt3" poll={poll} />
        </div>
      );
    });
    return <div id="pollGrid">{pollGrid}</div>;
  }
});