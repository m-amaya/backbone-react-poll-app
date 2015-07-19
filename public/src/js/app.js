var Poll = require('./model/Poll');
var PollCollection = require('./collection/PollCollection');
var PollCollectionView = require('./view/PollCollectionView.jsx');

var polls = new PollCollection();
var pollsView = new PollCollectionView({
  collection: polls
});
