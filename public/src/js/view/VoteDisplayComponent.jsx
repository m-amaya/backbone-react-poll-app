var D3Chart = require('./D3ChartComponent.jsx');

module.exports = React.createClass({
  render: function() {
    return (
      <div className="voteDisplay" id={"a"+this.props.poll.get("uuid")}>
        <D3Chart poll={this.props.poll} />
      </div>
    );
  }
});