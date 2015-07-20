var Poll = require('../model/Poll');

module.exports = React.createClass({
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
        <label for="questionIn" id="questionLbl">Question</label>
        <input id="questionIn" type="text" ref="question" required maxLength="100" />
        <label for="opt1In" id="opt1Lbl">Option #1</label>
        <input id="opt1In" type="text" ref="opt1" required maxLength="50" />
        <label for="opt2In" id="opt2Lbl">Option #2</label>
        <input id="opt2In" type="text" ref="opt2" required maxLength="50" />
        <label for="opt3In" id="opt3Lbl">Option #3</label>
        <input id="opt3In" type="text" ref="opt3" required maxLength="50" />
        <button type="submit">ADD POLL</button>
      </form>
    );
  }
});