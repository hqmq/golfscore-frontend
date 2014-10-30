/** @jsx React.DOM **/
var React = require('react');
var RecentGames = require('./recent_games');

var App = module.exports = React.createClass({
  getInitialState() {
    return {};
  },

  componentDidMount() {
    // kick off loading of data?
  },

  render() {
    return (
      <div className="container">
        <RecentGames></RecentGames>
      </div>
    );
  }
});
