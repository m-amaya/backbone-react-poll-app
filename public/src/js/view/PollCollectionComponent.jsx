var PollGrid = require('./PollGridComponent.jsx');
var PollForm = require('./PollFormComponent.jsx');
var BackboneMixin = require('../mixins/ComponentMixin');

module.exports = React.createClass({
  mixins: [BackboneMixin],
  getBackboneModels: function() {
    return [this.props.polls];
  },
  render: function() {
    return (
      <div id="main-content">
        <h1 className="title">keep calm and <span>POLL ON</span></h1>
        <div className="pollCount">Poll Count<span>{this.props.polls.size()}</span></div>
        < PollGrid polls={this.props.polls} />
        <div id="form-content">
          < PollForm polls={this.props.polls} />
        </div>
        <footer>
          <i className="fa fa-copyright"></i> 2015 mamaya (github.com/m-amaya)
        </footer>
      </div>
    );
  }
});