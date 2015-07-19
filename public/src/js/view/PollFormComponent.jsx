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
    newPoll.save({}, {
      success: function(model, response, options) {
        console.log("Response from [POST]: " + JSON.stringify(response));
      },
      error: function(model, xhr, options) {
        console.log("Error from [POST]: " + JSON.stringify(xhr));
      }
    });
  },
  render: function() {
    return (
      <form className="pollForm" onSubmit={this.addPoll}>
        <input type="text" placeholder="Question" ref="question" required />
        <input type="text" placeholder="Option 1" ref="opt1" required />
        <input type="text" placeholder="Option 2" ref="opt2" required />
        <input type="text" placeholder="Option 3" ref="opt3" required />
        <button type="submit">Add Poll</button>
      </form>
    );
  }
});