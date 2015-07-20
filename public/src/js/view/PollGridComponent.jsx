var PollComponent = require('./PollComponent.jsx');

module.exports = React.createClass({
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