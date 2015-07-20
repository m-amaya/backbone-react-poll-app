module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      width: 290,
      height: 290,
      maxColHeight: 230,
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
    if(this.props.poll.get("opt1votes") || this.props.poll.get("opt2votes") || this.props.poll.get("opt3votes")) {
      return (
        <svg width={this.props.width} height={this.props.height}>
          <g transform={this.getTranslateStr(1,this.calcHeight(this.props.poll.get("opt1votes")))}>
            <rect width={this.getColWidth()} height={this.calcHeight(this.props.poll.get("opt1votes"))} fill="#CCCCCC" />
            <text fill="#555555" y="-10">{this.props.poll.get("opt1votes") + " Votes"}</text>
          </g>
          <g transform={this.getTranslateStr(2,this.calcHeight(this.props.poll.get("opt2votes")))}>
            <rect width={this.getColWidth()} height={this.calcHeight(this.props.poll.get("opt2votes"))} fill="#eee"/>
            <text fill="#555555" y="-10">{this.props.poll.get("opt2votes") + " Votes"}</text>
          </g>
          <g transform={this.getTranslateStr(3,this.calcHeight(this.props.poll.get("opt3votes")))}>
            <rect width={this.getColWidth()} height={this.calcHeight(this.props.poll.get("opt3votes"))} fill="#FC8C7E"/>
            <text fill="#555555" y="-10">{this.props.poll.get("opt3votes") + " Votes"}</text>
          </g>
        </svg>
      );
    } else {
      return (
        <svg width={this.props.width} height={this.props.height}>
          <rect width={this.props.width} height={this.props.height} fill="#eee" />
        </svg>
      );
    }
  }
});