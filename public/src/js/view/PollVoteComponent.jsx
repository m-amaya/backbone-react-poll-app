module.exports = React.createClass({
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
        <div className={"opt " + optClass} onClick={this.upVote}>
          {this.props.poll.get(optClass)}</div>
      </div>
    );
  }
});