/*
 * https://github.com/facebook/react/blob/1be9a9e/examples/todomvc-backbone/js/app.js#L148-L171
 * 
 * A generic Mixin that can be added to any component that
 * should react to changes in a Backbone component. The
 * use cases we've identified thus far are for Collections --
 * since they trigger a change event whenever any of their
 * constituent items are changes there's no need to reconcile
 * for regular models.
 * 
 * Place this mixin near the top of your component hierarchy.
 */

module.exports = {
  componentDidMount: function() {
    // Whenever there may be a change in the Backbone data,
    // trigger a reconcile
    this.getBackboneModels().forEach(function(model) {
      model.on('add change remove', this.forceUpdate.bind(this, null), this);
    }, this);
  },
  componentWillUnmount: function() {
    // Ensure that we clean up any dangling references when
    // the component is destroyed
    this.getBackboneModels().forEach(function(model) {
      model.off(null, null, this);
    }, this);
  }
}